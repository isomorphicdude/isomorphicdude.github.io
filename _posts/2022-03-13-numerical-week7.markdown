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
f(θ) = ∑_{k = -∞}^∞ f̂ₖ {e}^{i k θ}
$$  
where $\hat{f}_k = \frac{1}{2\pi} \int_0^{2\pi}f(\theta) e^{-ik\theta} d\theta$  

(Note for Fourier Transform, we have $\hat{f}(\omega) = \int_{-\infty}^{+\infty} f(x) e^{i\omega x}dx$)  

### **Convergence**  
If $∑_{k = -∞}^∞ |f̂ₖ| < \infty$, then converges to the true function.  


### **Decaying of Coefficients**  

Use integration by parts to prove that the coefficients converge. (Example from PS7)  

$$
\begin{aligned}
f̂ₖ &= \frac{1}{2π} \int^{2π}_{0} f(θ) {e}^{-ikθ} dθ \\
&=\frac{1}{2π}[ \frac{e^{-ik\theta}}{-ik} - \int^{2π}_{0} f'(θ) {e}^{-ikθ}/(-ik\theta) dθ ] \\
&= \cdots \\
&=\frac{(-i)^λ}{2π k^{λ}} \int^{2π}_{0} f^{(λ)}(θ) {e}^{-ikθ} dθ
\end{aligned}
$$  

given that $f^{(λ)}$ is uniformly bounded, the convergence follows  

$$
|∑_{k=n}^{\infty} f̂_k {e}^{ikθ}| \leq ∑_{k=n}^{\infty} |f̂_k | \leq C ∑_{k=n}^{\infty} k^{-λ} 
$$

for some constant $C$.

## **Trapezium Rule Approximation**  

### **Goal**  

To approximate Fourier coefficients via Trapezium Rule integration,  

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
f̂_k^n = ⋯ + f̂_{k-2n} + f̂_{k-n} + f̂_k + f̂_{k+n} + f̂_{k+2n} + ⋯
$$

It follows that for all $p ∈ ℤ$, $f̂_k^n = f̂_{k+pn}^n$, which says the approximation to the $k^{th}$ coefficient using $n$ terms is the same as the approximation to the $(k+pn)^{th}$ term. This is useful in FFT.


## **Discrete Fourier Transform**  
We use the matrix times the values of $f$ at each $\theta_j$ to approximate the Fourier coefficients as above  

$$
\hat{f}_k^n = \frac{1}{n}\sum_{j=0}^{n-1} f(\theta_j) e^{-ik\theta_j}
$$
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
\hat{f}_k^n = \frac{1}{\sqrt{n}} Q_n \begin{bmatrix}f(\theta_0) \\ 
                                 \vdots \\
                                 f(\theta_{n-1}) 
                   \end{bmatrix}
$$  

### **Properties**  

- $Q_n$ is unitary: $Q_n^⋆ Q_n = Q_n Q_n^⋆ = I$.  

- $f_n(θ)$ interpolates $f$ at $θ_j$:
$$
f_n(θ_j) = f(θ_j)
$$


