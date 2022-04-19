---
layout: post
title: "MATH50003 Week 10&11"
permalink: /2022-04-06/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---   

# **Quadratures**  

## **Motivation**   

- Polynomials are easier for a computer to integrate. So to find the integral of a function, we would like to approximate it with polynomials; 
  
- The higher the degree, the better the approximation.  (Gaussian quadrature allows us to exploit higher degrees without much cost)  


## **Interpolatory Polynomials**   

- $n$ distinct points $x_1,…,x_n$ 
  
- $n$ samples $f_1,…,f_n$, a degree $n-1$  

Interpolatory polynomial $p(x)$ satisfies
$$
p(x_j) = f_j
$$  

### **Definition** (via Vandermonde)  

$$
V \begin{bmatrix}
    c_0 \\
    \vdots \\
    c_{n-1}
\end{bmatrix} 
=
\begin{bmatrix}
    f_1 \\
    \vdots \\
    f_{n}
\end{bmatrix}
$$

where   

$$
V := \begin{bmatrix} 1 & x_1 & ⋯ & x_1^{n-1} \\
                    ⋮ & ⋮ & ⋱ & ⋮ \\
                    1 & x_n & ⋯ & x_n^{n-1}
                    \end{bmatrix}
$$  


### **Uniqueness**   

- The interpolatory polynomial is unique 

- And the Vandermonde matrix is invertible.  


### **Lagrange Interpolation**   

$$
l_k(x) := ∏_{j ≠ k} {x-x_j \over x_k - x_j}
$$  

Then the interpolatory polynomial is given   

$$
p(x) = \sum_{k=1}^{n} f(x_j)l_k(x)
$$   

and the explicit form of the $l_k(x)$ is   

$$
 \delta_{kj}={(x-x_1) ⋯(x-x_{k-1})(x-x_{k+1}) ⋯ (x-x_n) \over (x_k - x_1) ⋯ (x_k - x_{k-1}) (x_k - x_{k+1}) ⋯ (x_k - x_n)}
$$  


## **Interpolatory Quadratures**  

Use polynomials to interpolate a function and get estimate for integration w.r.t some weight.  


### **Interpolatory  Quadrature Rule**  

Defined w.r.t. a set of points $\mathbf{x}=[x_1,...,x_n]$

$$
\int_a^b f(x)w(x) dx \approx Σ_n^{w,𝐱}[f] := ∑_{j=1}^n w_j f(x_j)
$$  

where  

$$
w_j := ∫_a^b ℓ_j(x) w(x) {\rm d} x
$$  


Note this is just $\int_a^b w(x) ∑_{j=1}^n l_j(x)f(x_j) dx$  

### **Exactness**  

Interpolatory quadrature is exact for all degree $n-1$ polynomials $p$:  

$$
∫_a^b p(x) w(x) {\rm d}x = Σ_n^{w,𝐱}[f]
$$   

which follows from uniqueness of interpolation.   

## **Roots of Orthogonal Polynomials**  

### **Distinct Roots**  

All the roots of the orthogonal polynomial $q_n(x)$ are distinct.  

### **Eigenvals of Jacobi are Roots**   

The roots are the eigenvalues of the truncated **symmetric Jacobi** by the 3-term recurrence, where the symmetry is due to orthonormality.     

And we get diagonalization of the truncated Jacobi.  

$$
X_n = Q_n^T D Q_n
$$   

where   

$$
Q_n = \begin{bmatrix}
q_0(x_1) & ⋯ & q_0(x_n) \\
⋮  & ⋯ & ⋮  \\
q_{n-1}(x_1) & ⋯ & q_{n-1}(x_n)
\end{bmatrix} \begin{bmatrix} α_1^{-1} \\ & ⋱ \\ && α_n^{-1} \end{bmatrix}
$$   


and   

$$
X_n := \begin{bmatrix} a_0 & b_0 \\
                         b_0 & ⋱ & ⋱ \\
                         & ⋱ & a_{n-2} & b_{n-2} \\
                         && b_{n-2} & a_{n-1} \end{bmatrix} ∈ ℝ^{n × n}
$$   


## **Gaussian Quadratures**  

### **Gauassian Quadrature Rule**  

- Fixed set of orthogonal polynomials $\{q_n(x)\}$  

- The set of points $\mathbf{x}=[x_1,...,x_n]$ is the set of roots of $q_n(x)$  

$$
\int_a^b f(x)w(x) dx \approx Σ_n^{w}[f] = \sum_{j=1}^n w_j f(x_j)
$$  
where  

$$
w_j := \frac{1}{\alpha_j^2}=\frac{1}{q_0(x_j)^2+\cdots+q_{n-1}(x_j)^2}
$$   

Note here the polynomials are normalized (*i.e.* they form an **orthonormal** basis), cf. Exercise Sheet 10  


### **Discrete Orthogonality**   

For $0 ≤ ℓ,m ≤ n-1$,  

$$
Σ_n^w[q_ℓ q_m] =\sum_{j=1}^n \frac{q_l(x_j)q_m(x_j)}{\alpha_j^2} =δ_{ℓm}
$$   

Again require the polynomials to form orthonormal basis, as in the proof $Q_n$ is used, which comes from a symmetric Jacobi matrix.  


### **Interpolation by Gaussian**  

We can interpolate $f(x)$ at the roots $x_j$ by the following using the orthogonal family in Gaussian. ($f_n(x_j)=f(x_j)$)  

$$
f_n(x)=\sum_{k=0}^{n-1} c_k^{(n)} q_k(x)
$$  

where   

$$
c_k^{(n)}=Σ_n^{w}[fq_k]=\sum_{j=1}^n f(x_j)q_k(x_j)w_j
$$   

### **Interating Gaussian same as Interpolatory**  

This follows uniqueness of interpolation.  

$$
\underbrace{Σ_n^{w}[f]}_{\rm Gaussian}= \underbrace{Σ_n^{w,\mathbf{x}}[f]}_{\rm Interpolatory}
$$   

### **Exactness of two-times**  

A Gaussian quadrature rule with $n$ roots is **exact for polynomial of** **degree $2n-1$**.   

$$
\int_a^b p(x)w(x) dx = Σ_n^{w}[p]
$$



