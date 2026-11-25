from typing import Sequence,Union
from alembic import op
import sqlalchemy as sa

revision:str="a1b2c3d4e5f6"
down_revision:Union[str,None]="e375d7c77adc"
branch_labels:Union[str,Sequence[str],None]=None
depends_on:Union[str,Sequence[str],None]=None

def upgrade()->None:
    op.add_column("users",sa.Column("last_search_params",sa.JSON(),nullable=True))
    op.create_unique_constraint("uq_user_activity_favorite","favorites",["user_id","activity_id"])

def downgrade()->None:
    op.drop_constraint("uq_user_activity_favorite","favorites",type_="unique")
    op.drop_column("users","last_search_params")
