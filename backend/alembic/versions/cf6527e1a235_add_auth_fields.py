"""add_auth_fields

Revision ID: cf6527e1a235
Revises: 17fe282f8663
Create Date: 2026-08-19 01:20:28.594143

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cf6527e1a235'
down_revision: Union[str, None] = '17fe282f8663'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # 1. Add hashed_password
    op.add_column('user', sa.Column('hashed_password', sa.String(), nullable=True))
    
    # 2. Add AccountStatus enum (Postgres safe)
    bind = op.get_bind()
    if bind.engine.name == 'postgresql':
        account_status_enum = sa.Enum('ACTIVE', 'SUSPENDED', 'DISABLED', name='accountstatus_enum')
        account_status_enum.create(bind, checkfirst=True)
        op.add_column('user', sa.Column('account_status', account_status_enum, server_default='ACTIVE', nullable=False))
    else:
        op.add_column('user', sa.Column('account_status', sa.Enum('ACTIVE', 'SUSPENDED', 'DISABLED', name='accountstatus_enum'), server_default='ACTIVE', nullable=False))

    # 3. Migrate data from is_active to account_status
    op.execute(
        "UPDATE \"user\" SET account_status = CAST(CASE WHEN is_active = true THEN 'ACTIVE' ELSE 'DISABLED' END AS accountstatus_enum)"
    )

def downgrade() -> None:
    op.drop_column('user', 'account_status')
    op.drop_column('user', 'hashed_password')
    
    bind = op.get_bind()
    if bind.engine.name == 'postgresql':
        op.execute("DROP TYPE IF EXISTS accountstatus_enum")