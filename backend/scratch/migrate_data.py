import sqlite3
import psycopg2
from psycopg2.extras import DictCursor, execute_values
import uuid
import datetime

def format_uuid(val):
    if not val: return None
    if isinstance(val, str) and len(val) == 32:
        return str(uuid.UUID(val))
    return str(val)

def main():
    sqlite_conn = sqlite3.connect('almabridge.db')
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cursor = sqlite_conn.cursor()

    pg_conn = psycopg2.connect('dbname=alumniconnect_test user=postgres password=')
    pg_cursor = pg_conn.cursor()

    # Disable FK checks temporarily
    pg_cursor.execute('SET session_replication_role = replica;')

    tables_order = [
        'department', 'industry', 'skill', 'community_category', 'opportunity_type', 'institution',
        'user', 'alumni_profile', 'student_profile', 'opportunity', 'event', 'community', 'resume',
        'alumni_skill', 'announcement', 'audit_log', 'community_membership', 'community_post',
        'contribution_record', 'event_registration', 'file_metadata', 'job_application',
        'mentorship_request', 'message', 'notification', 'opportunity_skill', 'portfolio_item',
        'referral', 'report', 'student_skill'
    ]

    sqlite_cursor.execute('SELECT name FROM sqlite_master WHERE type="table"')
    all_sqlite_tables = [row[0] for row in sqlite_cursor.fetchall()]

    skipped_tables = ['alembic_version', 'company', 'company_relationship', 'placement_drive', 'placement_cell']
    
    counts = {'sqlite': {}, 'pg': {}}

    for table in tables_order:
        if table in skipped_tables or table not in all_sqlite_tables:
            continue
            
        sqlite_cursor.execute(f'SELECT * FROM "{table}"')
        rows = sqlite_cursor.fetchall()
        counts['sqlite'][table] = len(rows)
        
        if len(rows) == 0:
            counts['pg'][table] = 0
            continue
            
        columns = rows[0].keys()
        
        if table == 'user':
            # Remove legacy columns
            columns = [c for c in columns if c not in ('company_id', 'institution_id')]
            # Add new columns
            columns.extend(['hashed_password', 'account_status'])
            
        insert_cols = ', '.join(f'"{c}"' for c in columns)
        
        # Need to cast some columns for postgres
        placeholders = []
        for c in columns:
            if c == 'role' and table == 'user':
                placeholders.append('%s::userrole_enum')
            elif c == 'account_status' and table == 'user':
                placeholders.append('%s::accountstatus_enum')
            elif c == 'status' and table == 'job_application':
                placeholders.append('%s::applicationstatus_enum')
            elif c == 'visibility' and table == 'community':
                placeholders.append('%s::communityvisibility_enum')
            elif c == 'status' and table == 'mentorship_request':
                placeholders.append('%s::mentorshipstatus_enum')
            elif c == 'context' and table == 'message':
                placeholders.append('%s::messagecontext_enum')
            elif c == 'type' and table == 'notification':
                placeholders.append('%s::notificationtype_enum')
            elif c == 'status' and table == 'opportunity':
                placeholders.append('%s::opportunitystatus_enum')
            elif c == 'status' and table == 'placement_drive':
                placeholders.append('%s::drivestatus_enum')
            elif c == 'status' and table == 'company_relationship':
                placeholders.append('%s::partnershipstatus_enum')
            elif c == 'status' and table == 'announcement':
                placeholders.append('%s::announcementstatus_enum')
            elif c == 'status' and table == 'referral':
                placeholders.append('%s::referralstatus_enum')
            elif c == 'status' and table == 'report':
                placeholders.append('%s::reportstatus_enum')
            elif c == 'verification_status' and table == 'user':
                placeholders.append('%s::verificationstatus_enum')
            else:
                placeholders.append('%s')
                
        insert_placeholders = ', '.join(placeholders)
        
        insert_data = []
        for row in rows:
            row_data = dict(row)
            new_row = []
            for col in columns:
                if table == 'user' and col == 'hashed_password':
                    new_row.append(None)
                elif table == 'user' and col == 'account_status':
                    is_active = row_data.get('is_active')
                    new_row.append('ACTIVE' if is_active else 'DISABLED')
                else:
                    val = row_data.get(col)
                    # Format UUIDs
                    if col.endswith('id') and val:
                        val = format_uuid(val)
                    if col == 'id' and val:
                        val = format_uuid(val)
                    
                    # Convert integer 1/0 to boolean
                    if col in ('is_active', 'is_verified', 'is_read', 'mentorship_available'):
                        if val == 1: val = True
                        elif val == 0: val = False
                        
                    new_row.append(val)
            insert_data.append(tuple(new_row))
            
        try:
            execute_values(pg_cursor, f'INSERT INTO "{table}" ({insert_cols}) VALUES %s', insert_data, template=f'({insert_placeholders})')
        except Exception as e:
            print(f"Error inserting into {table}: {e}")
            pg_conn.rollback()
            return
            
        pg_cursor.execute(f'SELECT count(*) FROM "{table}"')
        counts['pg'][table] = pg_cursor.fetchone()[0]

    pg_cursor.execute('SET session_replication_role = DEFAULT;')
    pg_conn.commit()

    print('=== MIGRATION COUNTS ===')
    for table in tables_order:
        if table in counts['sqlite']:
            print(f'{table}: SQLite={counts["sqlite"][table]}, PG={counts["pg"][table]}')
            
    print('\\n=== SKIPPED TABLES ===')
    for table in skipped_tables:
        print(table)
        
    sqlite_conn.close()
    pg_conn.close()

if __name__ == "__main__":
    main()
