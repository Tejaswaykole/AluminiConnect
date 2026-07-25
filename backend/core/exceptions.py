from fastapi import HTTPException, status

class DomainException(HTTPException):
    def __init__(self, detail: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        super().__init__(status_code=status_code, detail=detail)

class DuplicateRegistrationException(DomainException):
    def __init__(self):
        super().__init__(detail="User is already registered for this event.")

class CommunityAccessDeniedException(DomainException):
    def __init__(self):
        super().__init__(detail="Access denied. You are not a member of this community.", status_code=status.HTTP_403_FORBIDDEN)

class MentorshipUnavailableException(DomainException):
    def __init__(self):
        super().__init__(detail="Alumni is currently not accepting mentorship requests.")

class OpportunityClosedException(DomainException):
    def __init__(self):
        super().__init__(detail="This opportunity is closed and no longer accepting applications.")
