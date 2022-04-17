---
layout: post
title: "MATH50003 Week2"
permalink: /2022-01-23/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---

# **Numerical Differentiation** 

## **Finite Difference**   

  $$
  \frac{f(x+h)-f(x)}{h} \qquad \text{(one-sided)}
  $$  

  $$
  \frac{f(x+h)-f(x-h)}{2h} \qquad \text{(central difference)}
  $$   
  
  $$
  \frac{f(x+h) - 2f(x) + f(x-h)}{h^2} \qquad \text{(second-derivative)}
  $$   

- Recall Taylor's series with remainder term up to 2 (including 2 remainder), 
the $\frac{f''(t)h^2}{2! \ h}$ is the absolute error

- When bounding, often get rid of goal $f'(x)$ and the denominator $h$, also assuming division by $h$ and addition both exact.  

- The following gives error bound for estimating $f'(x)$.  

$$
(f^{\rm FP}(x + h) ⊖ f^{\rm FP}(x)) ⊘ h = f'(x) + \underbrace{f'(x) δ_1 + {f''(t) \over 2} h (1 + \delta_1) + {δ^f_{x+h}- δ^f_x \over h} (1 + δ_1)}_{δ_{x,h}^{\rm FD}}
$$  

- Note the error bound (from lecture notes)   

$$
|δ_{x,h}^{\rm FD}| \leq {|f'(x)| \over 2} ϵ_{\rm m} + M h +  {4c ϵ_{\rm m} \over h}
$$  

- where we have a bounded second derivative   

$$
M =\sup_{x \leq t \leq x+h} |f''(t)|
$$   
    


### **Difficulty**
- Numerical instability in floating point arithmetic  

- **e.g.** $f=1+x+x^2$ works well but going above significant bits yields $0$
$g=1+x/3+x^2$ analogous.
### **Reason for above** 
- **case1** $0 \leq n \leq \frac{S}{2}$, ($S$ no of mantissa), exact computation but with error
- **case2** $\frac{S}{2}<n\leq S$  last term of high power gets dropped so exact in this case with no error
- **case3** $n \geq S$ all powers get dropped only 1 left so error is 1

### **Solution**

- Would like to find optimal point  
- **Heuristic** is to balance error choose $Mh =4c/h \epsilon$
- h is approx. $\sqrt{\epsilon}$

## **Differentiation with Dual Numbers**
Take $a+b\epsilon$, where $\epsilon ^2=0$.  

For any polynomial  

$$
p(a+b\epsilon)=p(a)+bp'(a)\epsilon
$$  


Thus for any other functions, express them using *Taylor* and differentiate term by term.

### **Dual Extension**  

If   

$$
f(a+b\epsilon)=f(a)+bf'(a)\epsilon
$$    

then such functions are called dual extensions at $a$.  
**e.g.** $\cos(a+b\epsilon)=\cos(a)-\sin(a)b\epsilon$  

Also valid for some functions with non-convergent Taylor series  

$$
|a+b\epsilon|=|a|+b \  r'(a) \epsilon
$$  

**Product and Chain rule still holds** for dual extensions, so can differentiate all common functions.  
**e.g.**  

$$
f(x) = \exp(\exp(x)\cos(x)+\sin(x))
$$  

$$
f(0.1+\epsilon) = f(0.1) \ + f'(0.1)\epsilon 
$$   

$$
\exp([e^{0.1}+e^{0.1}\epsilon][\cos(0.1)-\sin(0.1)\epsilon]+[\sin(0.1)+\cos(0.1)\epsilon]) 
$$   

$$
= \exp(e^{0.1} \cos(0.1) +\sin(0.1) + \mathbf{\epsilon} \ [e^{0.1}\cos(0.1)-e^{0.1}\sin(0.1)+\cos(0.1)])
$$   

So the derivative at $0.1$ is given by the dual part times $\exp(real)$  

```julia
# Can use ForwardDiff to verify
using ForwardDiff
f = x->exp(exp(x)*cos(x)+sin(x))
g = x->ForwardDiff.derivative(f, x)
g(0.1)==
(exp(0.1)*cos(0.1)-exp(0.1)*sin(0.1)+cos(0.1))*exp(exp(0.1)*cos(0.1)+sin(0.1))
```

## **Asymptotics**

### **Big and Small O**  

$$
f(n) = O(\phi(n)) \qquad |\frac{f(n)}{\phi(n)}|\leq C
$$  
  
$$
f(n) = o(\phi(n)) \qquad |\frac{f(n)}{\phi(n)}| \rightarrow 1
$$  

### **Relations**
- Multipicative  

$$
O(\phi(n)) \ O(\psi(n)) = O(\phi(n)\psi(n))  $$  

- Additive
  
$$
O(\phi(n)) + O(\psi(n)) = O(|\phi(n)| + |\psi(n)|)
$$  

### **Example**
```julia
cnt = 0
for k = 1:n
    for j = 1:k
        cnt += j^2
    end
end
```
Ignore the accesses to memory and add to get
$$\sum_{k=1}^n O(k)=O(\sum_{k=1}^n k)=O(n^2)$$

