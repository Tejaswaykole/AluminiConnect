from typing import Generic, TypeVar, Any, Optional
from repositories.base import BaseRepository

RepoType = TypeVar("RepoType", bound=BaseRepository)

class BaseService(Generic[RepoType]):
    def __init__(self, repository: RepoType):
        self.repository = repository
