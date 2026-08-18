import enum

class UserRole(str, enum.Enum):
    STUDENT = "STUDENT"
    ALUMNI = "ALUMNI"
    INSTITUTE = "INSTITUTE"
    ADMIN = "ADMIN"

class VerificationStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class AccountStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    DISABLED = "DISABLED"

class OpportunityStatus(str, enum.Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"

class ApplicationStatus(str, enum.Enum):
    APPLIED = "APPLIED"
    UNDER_REVIEW = "UNDER_REVIEW"
    SHORTLISTED = "SHORTLISTED"
    INTERVIEW = "INTERVIEW"
    SELECTED = "SELECTED"
    REJECTED = "REJECTED"
    WITHDRAWN = "WITHDRAWN"


class MessageContext(str, enum.Enum):
    DIRECT = "DIRECT"
    MENTORSHIP = "MENTORSHIP"
    RECRUITER = "RECRUITER"
    INSTITUTION = "INSTITUTION"

class CommunityVisibility(str, enum.Enum):
    PUBLIC = "PUBLIC"
    PRIVATE = "PRIVATE"

class MentorshipStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"

class NotificationType(str, enum.Enum):
    INFO = "INFO"
    ALERT = "ALERT"
    MESSAGE = "MESSAGE"