from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    groups = models.ManyToManyField(
        Group,
        related_name="customuser_groups",  # Avoid conflict with auth.User.groups
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_user_permissions",  # Avoid conflict with auth.User.user_permissions
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Add 'username' here to require it during createsuperuser

    def __str__(self):
        return self.email


class Lead(models.Model):
    STATUS_CHOICES = [
        ('NONE', '-None-'),
        ('ATTEMPTED_CONTACT', 'Attempted to Contact'),
        ('CONTACT_IN_FUTURE', 'Contact in Future'),
        ('CONTACTED', 'Contacted'),
        ('JUNK_LEAD', 'Junk Lead'),
        ('LOST_LEAD', 'Lost Lead'),
        ('NOT_CONTACTED', 'Not Contacted'),
        ('PRE_QUALIFIED', 'Pre-Qualified'),
        ('NOT_QUALIFIED', 'Not Qualified'),
    ]

    RATING_CHOICES = [
        ('NONE', '-None-'),
        ('ACQUIRED', 'Acquired'),
        ('ACTIVE', 'Active'),
        ('MARKET_FAILED', 'Market Failed'),
        ('PROJECT_CANCELLED', 'Project Cancelled'),
        ('SHUT_DOWN', 'Shut Down'),
    ]

    LEAD_SOURCE_CHOICES = [
        ('NONE', '-None-'),
        ('ADVERTISEMENT', 'Advertisement'),
        ('COLD_CALL', 'Cold Call'),
        ('EMPLOYEE_REFERRAL', 'Employee Referral'),
        ('EXTERNAL_REFERRAL', 'External Referral'),
        ('ONLINE_STORE', 'Online Store'),
        ('PARTNER', 'Partner'),
        ('PUBLIC_RELATIONS', 'Public Relations'),
        ('SALES_EMAIL_ALIAS', 'Sales Email Alias'),
        ('SEMINAR_PARTNER', 'Seminar Partner'),
        ('INTERNAL_SEMINAR', 'Internal Seminar'),
        ('TRADE_SHOW', 'Trade Show'),
        ('WEB_DOWNLOAD', 'Web Download'),
        ('WEB_RESEARCH', 'Web Research'),
        ('CHAT', 'Chat'),
        ('TWITTER', 'X (Twitter)'),
        ('FACEBOOK', 'Facebook'),
    ]

    INDUSTRY_CHOICES = [
        ('NONE', '-None-'),
        ('ASP', 'ASP (Application Service Provider)'),
        ('DATA_TELECOM_OEM', 'Data/Telecom OEM'),
        ('ERP', 'ERP (Enterprise Resource Planning)'),
        ('GOVERNMENT_MILITARY', 'Government/Military'),
        ('LARGE_ENTERPRISE', 'Large Enterprise'),
        ('MANAGEMENT_ISV', 'Management ISV'),
        ('MSP', 'MSP (Management Service Provider)'),
        ('NETWORK_EQUIPMENT_ENTERPRISE', 'Network Equipment Enterprise'),
        ('NON_MANAGEMENT_ISV', 'Non-management ISV'),
        ('OPTICAL_NETWORKING', 'Optical Networking'),
        ('SERVICE_PROVIDER', 'Service Provider'),
        ('SMALL_MEDIUM_ENTERPRISE', 'Small/Medium Enterprise'),
        ('STORAGE_EQUIPMENT', 'Storage Equipment'),
        ('STORAGE_SERVICE_PROVIDER', 'Storage Service Provider'),
        ('SYSTEMS_INTEGRATOR', 'Systems Integrator'),
        ('WIRELESS_INDUSTRY', 'Wireless Industry'),
    ]

    name = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    lead_source = models.CharField(max_length=50, choices=LEAD_SOURCE_CHOICES, default='NONE')
    industry = models.CharField(max_length=50, choices=INDUSTRY_CHOICES, default='NONE')
    annual_revenue = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    email_opt_out = models.BooleanField(default=False)
    company = models.CharField(max_length=255, blank=True, null=True)
    fax = models.CharField(max_length=50, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    lead_status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='NONE')
    no_of_employees = models.PositiveIntegerField(blank=True, null=True)
    rating = models.CharField(max_length=50, choices=RATING_CHOICES, default='NONE')
    skype_id = models.CharField(max_length=255, blank=True, null=True)
    secondary_email = models.EmailField(blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)
    street = models.TextField(blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name if self.name else "Unnamed Lead"