
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '1e002ebe1d6c'
down_revision: Union[str, None] = '0c24075b4c99'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    pass

def downgrade() -> None:
    pass

