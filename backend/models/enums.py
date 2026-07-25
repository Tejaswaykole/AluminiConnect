import enum

class UserRole(str, enum.Enum):
    STUDENT = "STUDENT"
    ALUMNI = "ALUMNI"
    PLACEMENT_OFFICER = "PLACEMENT_OFFICER"
    COMPANY_RECRUITER = "COMPANY_RECRUITER"
    INSTITUTION_ADMIN = "INSTITUTION_ADMIN"
    SUPER_ADMIN = "SUPER_ADMIN"

class VerificationStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

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

class DriveStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

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