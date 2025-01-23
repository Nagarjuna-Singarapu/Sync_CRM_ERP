from django.urls import path
from .views import SignupView, login_view, LeadCreateView, LeadDeleteView, LeadDetailView, LeadListView, LeadUpdateView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', login_view, name='api-login'),

    path('leads/', LeadListView.as_view(), name='lead-list'),           # List all leads
    path('leads/create/', LeadCreateView.as_view(), name='lead-create'), # Create a lead
    path('leads/<int:pk>/', LeadDetailView.as_view(), name='lead-detail'), # Retrieve a single lead
    path('leads/<int:pk>/update/', LeadUpdateView.as_view(), name='lead-update'), # Update a lead
    path('leads/<int:pk>/delete/', LeadDeleteView.as_view(), name='lead-delete'), # Delete a lead
]
