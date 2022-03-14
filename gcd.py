q=0
def gcd(a,b):
    global q
    if b>a:
        d = b//a
        r = b% a
        k=a
    else:
        d = a//b
        r = a%b
        k=b
    q+=1
    return k,r
def euc(a,b):
    k,r = gcd(a,b)
    while r!=0:
        k,r = gcd(k,r)
    return k
a = int(input("Enter a Number:"))
b = int(input("Enter a Number:"))
if euc(a,b)==1:
    print("{}と{}は互いに素".format(a,b))
else:
    print("{}と{}の最大公約数は{}".format(a,b,euc(a,b)))
print("{}回演算しました。".format(q))