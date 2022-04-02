---
layout: post
title: "MATH50003 Week 8&9"
permalink: /2022-03-31/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---  
# **Orthogonal Polynomials**  

## **Motivation**  

Wish to approximate a function more easily using polynomials. Functions like $\frac{1}{25x^2+1}$ cannot be approximated by Taylor inside the unit disk, so we need alternatives.  

## **Definition**  

Orthogonal polynomials are determined by **graded basis** and **inner product (w/ weight)**.  

### **Graded Basis**  

$$
\{p_0(x), p_1(x), \cdots, \}
$$  

- Each $p_k(x)$ has degree exactly $k$  

- Unique coefficients $k_n^{(j)}$'s for $p_n(x)=\sum_{j=0}^n k_n^{(j)}x^j$  

- Note when this is finite then exactly the basis.  

### **Inner Product determined by $w(x)$**   

Defined for positive weight $w(x)>0$ on interval $(a,b)$  

$$
\langle f,g \rangle:=\int_a^b f(x)g(x)w(x)dx
$$

## **Existence and Uniqueness**   

### **Existence**  

Given weight $w(x)$, can construct orthogonal polynomials from $\{1,x,x^2,...\}$ by Gram-Schmidt.  

### **Uniqueness**  

Given weight $w(x)$ and the constructed orthogonal polynomials $\{p_0(x), p_1(x),\dots\}$, the following are equivalent.  

- $deg \ p(x) =n$ and $\langle p, r \rangle=0$ for all $r(x)$ with degree less than $n$.  

- $p(x)=cp_n(x)$ for some constant $c$.  

This shows that orthogonal polynomials are uniquely determined by the coefficients $k_n$ and the weight. 

In particular, **monic** orthogonal polynomials are unique.   

Thus, to prove some function is some orthogonal polynomial $T_n(x)$, it suffices to check  

- $f(x)$ is polynomial  

- $f(x)$ is orthogonal to all polys of lower degree  

- $f(x)$ has the same leading coefficient as $T_n(x)$  


## **3-term Recurrence**  

$$
\begin{aligned}
    xp_0(x)&=a_0p_0(x)+b_0p_1(x) \\
    xp_n(x)&=c_{n-1}(x)+a_np_n(x)+b_np_{n+1}(x)
\end{aligned}
$$  

It follows that if the previous term $p_n(x)$ is monic, then $p_{n+1}(x)$ is also monic.  

## **Common Orthogonal Polynomials**  

### **Chebyshev 1st**  

$$
\begin{aligned}
T_0(x) &= 1, \\
T_n(x) &= 2^{n-1} x^n + O(x^{n-1})
\end{aligned}
$$  

**Weight:** $w(x) = 1/\sqrt{1-x^2}$ on $[-1,1]$.  

**Alternative:** $T_n(cos\theta)=cos(n\theta)$  

**3-term Recurrence:**  

$$
\begin{aligned}
    xT_0(x)&=T_1(x) \\
    xT_n(x)&=\frac{T_{n-1}(x)+T_{n+1}(x)}{2} 
\end{aligned}
$$

**First Few:**  

$$
\begin{aligned}
    T_0(x)&=1 \\
    T_1(x)&=x \\
    T_2(x)&=2x^2-1 \\
    T_3(x)&=4x^3-3x \\
    T_4(x)&=8x^4-8x^2+1 \\
\end{aligned}
$$   

### **Chebyshev 2nd**   

$$
\begin{aligned}
U_0(x) &= 1, \\
U_n(x) &= 2^{n} x^n + O(x^{n-1})
\end{aligned}
$$  

**Weight:** $w(x) = \sqrt{1-x^2}$ on $[-1,1]$.  
**Alternative:** $U_n(x)=\frac{sin(n+1)\theta}{sin \theta}$  

**3-term Recurrence:**   

$$
\begin{aligned}
    xU_0(x)&=U_1(x)/2 \\
    xU_n(x)&=\frac{U_{n-1}(x)+U_{n+1}(x)}{2}
\end{aligned}
$$

**First Few:**  
$$
\begin{aligned}
    U_0(x)&=1 \\
    U_1(x)&=2x \\
    U_2(x)&=4x^2-1 \\
    U_3(x)&=8x^3-4x \\
    U_4(x)&=16x^4-12x^2+1
\end{aligned}
$$  

### **Legendre**  

$$
\begin{aligned}
    P_0(x)&=1 \\
    P_n(x)&=\sum_{k=0}^{n} \frac{1}{2^k}\binom{2n}{n} x^n
\end{aligned}
$$  

**Weight:** $w(x) = 1$ on $[-1,1]$.  

**Alternative:**   
(Rodriguez Formula)  
$$
P_n(x)=\frac{1}{(-2)^n n!}\frac{d^n}{dx^n}(1-x^2)^n
$$

**3-term Recurrence:**   

$$
\begin{aligned}
    xP_0(x)&=P_1(x) \\
    (2n+1)xP_n(x)&=nP_{n-1}(x)+(n+1)P_{n+1}(x)
\end{aligned}
$$


**First Few**  

$$
\begin{aligned}
    P_0(x)&=1 \\
    P_1(x)&=x \\
    P_2(x)&=\frac{1}{2}(3x^2-1) \\
    P_3(x)&=\frac{1}{2}(5x^3-3x) \\
    P_4(x)&=\frac{1}{8}(35x^4-30x^2+3)
\end{aligned}
$$  

### **Hermite**  

$$
\begin{aligned}
    H_0(x)&=1 \\
    H_n(x)&=2^nx^n+O(x^{n-1})
\end{aligned}
$$ 

**Weight:** $w(x) = \exp(-x^2)$  on $(-∞,∞)$  

**Alternative:**  
(Rodriguez Formula)  

$$
H_n(x)=(-1)^n \frac{d^n}{dx^n}exp(-x^2)
$$


**3-term Recurrence:**   

$$
\begin{aligned}
    xH_0(x)&=H_1(x)/2 \\
    xH_n(x)&=-nH_{n-1}(x) + H_{n+1}(x)/2
\end{aligned}
$$


**First Few**  

$$
\begin{aligned}
    H_0(x)&=1 \\
    H_1(x)&=2x \\
    H_2(x)&=4x^2-2 \\
    H_3(x)&=8x^3-12x \\
    H_4(x)&=16x^4-48x^2+12 \\
\end{aligned}
$$


## **Jacobi Matrices**  

Column-wise representation for the 3-term recurrence.  

$$
X = \begin{bmatrix} a_0 & c_0 \\
                    b_0 & a_1 & c_1\\
                    & b_1 & a_2 & ⋱ \\
                    && ⋱ & ⋱
    \end{bmatrix}
$$  

So  

$$
x[p_0 |p_1|p_2|\dots]=[a_0p_0+b_0p_1|c_0p_0+a_1p_1+b_1p_2|\dots]\\
=[p_0 |p_1|p_2|\dots]X
$$   

When the polynomials are orthonormal then $X=X^T$







