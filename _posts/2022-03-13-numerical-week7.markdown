---
layout: post
title: "MATH50003 Week7"
permalink: /2022-03-13/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---  

# **Fourier Series**  

## **Definitions and Properties**  

$$
f(θ) = ∑_{k = -∞}^∞ \hat{f}_k {e}^{i k θ}
$$  

where   

$$
\hat{f}_k = \frac{1}{2\pi} \int_0^{2\pi}f(\theta) e^{-ik\theta} d\theta
$$    

(Note for Fourier Transform, we have $\hat{f}(\omega) = \int_{-\infty}^{+\infty} f(x) e^{i\omega x}dx$)  

### **Convergence**  
If  

$$∑_{k = -∞}^∞ |\hat{f}_k| < \infty$$  

then converges to the true function.  


### **Decaying of Coefficients**  

Use integration by parts to prove that the coefficients converge. (Example from PS7)  

$$
\begin{aligned}
\hat{f}_k &= \frac{1}{2π} \int^{2π}_{0} f(θ) {e}^{-ikθ} dθ \\

&=\frac{1}{2π}[ \frac{f(\theta) \ e^{-ik\theta}}{-ik} \Big|_0^{2\pi} - \int^{2π}_{0} f'(θ) {e}^{-ikθ}/(-ik\theta) dθ ] \\

&= \cdots \\

&=\frac{(-i)^λ}{2π k^{λ}} \int^{2π}_{0} f^{(λ)}(θ) {e}^{-ikθ} dθ
\end{aligned}
$$  

given that $f^{(λ)}$ is uniformly bounded and the preceeding ones are $2\pi$ periodic, the convergence follows  

$$
|∑_{k=n}^{\infty} \hat{f}_k {e}^{ikθ}| \leq ∑_{k=n}^{\infty} |\hat{f}_k | \leq C ∑_{k=n}^{\infty} k^{-λ} 
$$  

for some constant $C$.  

## **Trapezium Rule Approximation**   

### **Goal**   

To approximate Fourier coefficients via Trapezium Rule integration in the interval $[0,2\pi]$,  

$$
\hat{f}_n^k =\frac{1}{n} \sum_{j=0}^{n-1} f(\theta_j) e^{-ik\theta_j}
$$  

where $\theta_j = \frac{2\pi j}{n}$.  

### **Discrete Orthogonality**  

$$
∑_{j=0}^{n-1} {e}^{i k θ_j} = \begin{cases} n & k = \ldots,-2n,-n,0,n,2n,\ldots  \cr
0 & \text{otherwise}
\end{cases}
$$  

### **Discrete Coefficients is infinite sum**  

Using lemma above and expanding the $f(\theta_j)$'s, we get if $𝐟̂$ is absolutely convergent then  

$$
\hat{f}_k^n = ⋯ + \hat{f}_{k-2n} + \hat{f}_{k-n} + \hat{f}_k + \hat{f}_{k+n} + \hat{f}_{k+2n} + ⋯
$$  

### **Aliasing**  

It follows that for all $p ∈ ℤ$

$$
\hat{f}_k^n = \hat{f}_{k+pn}^n
$$   

which says the approximation to the $k^{th}$ coefficient using $n$ terms is the same as the approximation to the $(k+pn)^{th}$ term. This is useful in FFT.  


## **Discrete Fourier Transform**  
We use the matrix times the values of $f$ at each $\theta_j$ to approximate the Fourier coefficients as above (note by aliasing the method also computes the negative indexed ones)

$$
\hat{f}_k^n = \frac{1}{n}\sum_{j=0}^{n-1} f(\theta_j) e^{-ik\theta_j}
$$    

Let $\omega=\exp(i\frac{2\pi}{n})$  

$$
\begin{aligned}
Q_n &:= {1 \over √n} \begin{bmatrix} 1 & 1 & 1&  ⋯ & 1 \\
                                    1 & {e}^{-{ i} θ_1} & {e}^{-{ i} θ_2} & ⋯ & {e}^{-{ i} θ_{n-1}} \\
                                    1 & {e}^{-{ i} 2 θ_1} & {e}^{-{ i} 2 θ_2} & ⋯ & {e}^{-{ i} 2θ_{n-1}} \\
                                    ⋮ & ⋮ & ⋮ & ⋱ & ⋮ \\
                                    1 & {e}^{-{ i} (n-1) θ_1} & {e}^{-{ i} (n-1) θ_2} & ⋯ & {e}^{-{ i} (n-1) θ_{n-1}}
\end{bmatrix} \\
&= {1 \over √n} \begin{bmatrix} 1 & 1 & 1&  ⋯ & 1 \\
                                    1 & ω^{-1} & ω^{-2} & ⋯ & ω^{-(n-1)}\\
                                    1 & ω^{-2} & ω^{-4} & ⋯ & ω^{-2(n-1)}\\
                                    ⋮ & ⋮ & ⋮ & ⋱ & ⋮ \\
                                    1 & ω^{-(n-1)} & ω^{-2(n-1)} & ⋯ & ω^{-(n-1)^2}
\end{bmatrix}
\end{aligned}
$$  

Then  

$$
\begin{bmatrix}f_0^n \\ f_1^n \\ \vdots \\ f_{n-1}^n\end{bmatrix} = \frac{1}{\sqrt{n}} Q_n \begin{bmatrix}f(\theta_0) \\ 
                                 \vdots \\
                                 f(\theta_{n-1}) 
                   \end{bmatrix}
$$  

### **Properties**  

- $Q_n$ is unitary: $Q_n^* Q_n = Q_n Q_n^* = I$.  

- $f_n(θ)$ interpolates $f$ at $θ_j$ for Taylor (same for general case):
$$
f_n(θ_j) =\sum_{k=0}^{n-1} \hat{f}_k^n e^{ik\theta_j} =f(θ_j)
$$  

## **Approximation**  

For the general (non-Taylor) case and $n = 2m+1$, we have  

$$
f_{-m:m}(θ) := ∑_{k=-m}^m \hat{f}_k^n {e}^{ik θ}
$$  

converges to $f(θ)$ as $n \rightarrow ∞$. (See PS7 last question)  



