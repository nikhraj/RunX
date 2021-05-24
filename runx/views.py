from django.shortcuts import render
from django.http import HttpResponse, Http404

from .models import database
from compression_middleware.decorators import compress_page
from django.views.decorators.csrf import csrf_exempt
from json import dumps
 
import datetime
import random
import shortuuid

# Create your views here.

@csrf_exempt
def home_page(request):
    POST = request.POST
    if POST:
        lang = POST['lang']
        fname = POST['fname']
        uid = shortuuid.ShortUUID().random(length=4)
        database.objects.create(uid=uid,lang=lang,fname=fname)
        dicti = {
            'uid':uid,
            'lang':lang,
            'fname':fname
        }
        # dump data
        dataJSON = dumps(dicti)
        return render(request,'redirect.html',{'data':dataJSON})
    else:
        return render(request,'filename.html')
    return render(request,'filename.html')

def bookmarks(request):
    return render(request,'bookmarks.html')

def codeview(request,ID):
    POST = request.POST
    if POST:
        try:
            ob = database.objects.get(uid = ID)
        except Exception:
            raise Http404
        fname = POST['fname']
        code = POST['src']
        ob.fname = fname
        ob.src = code
        dicti1 = {
            'uid':ob.uid,
            'lang':ob.lang,
            'fname':ob.fname,
            'src':ob.src
        }
        # dump data
        dataJSON1 = dumps(dicti1)
        return render(request,'index.html',{'data':dataJSON1})
    else:
        try:
            ob = database.objects.get(uid = ID)
        except Exception:
            raise Http404
        dicti2 = {
                'uid':ob.uid,
                'lang':ob.lang,
                'fname':ob.fname,
                'src':ob.src
            }
            # dump data
        dataJSON2 = dumps(dicti2)
        return render(request,'index.html',{'data':dataJSON2})








