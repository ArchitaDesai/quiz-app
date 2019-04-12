from django.views.generic import TemplateView
from django.http import HttpResponse

catchall = TemplateView.as_view(template_name='index.html')

def about_view(request, *args, **kwargs):
    return HttpResponse("<h1>Hello world</h1>")

