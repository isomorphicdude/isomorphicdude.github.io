---
layout: post
title: "MATH50003 Week5"
permalink: /2022-02-22/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---  

## **Matrix Norms**  

### **Induced Norms:**  

$$
\|A \|_{X → Y} := \sup_{𝐯 : \|𝐯\|_X=1} \|A 𝐯\|_Y
$$  
if only $X$ then it's to itself.  

### **Common Results**  

- $||A||_1 = \max_{\text{columns}} ||\mathbf{a_j}||$, where $||\mathbf{a_j}||$ is the $1-norm$ of the *column*

- $||A||_2 = \sigma_1$, the maximal singular value, and if $A$ invertible then $||A^{-1}|| = \sigma_n^{-1}$  

- $||A||_{\infty} = \max_{\text{rows}} ||\mathbf{a_j}||$, where $||\mathbf{a_j}||$ is the $1-norm$ of the *row*  

- $||A||_{1 \to \infty} = \max |a_{i,j}|$, the maximal entry, (see week5 solution 2.1)  

- $||A||_F = \sqrt{tr(A^TA)}$
- $||QA||_F = ||A||_F$, the Frobenius norm as the square root of sum of all entries squared.  

- $||A||_2 \leq ||A||_F \leq \sqrt{r} ||A||_2$, $r$ being the rank of $A$

## **To check**  

```julia
m,n = 5,3
A = randn(m,n)
opnorm(A,1) == maximum(norm(A[:,j],1) for j = 1:n)
opnorm(A,Inf) == maximum(norm(A[k,:],1) for k = 1:m)
opnorm(A) # the 2-norm

```


## SVD


## **Conditional Numbers**

### **Goal:**  

- To bound the relative error of matrix-vector multiplication.

- Recall the operation with floating point 
$$
x \otimes y = (1+\delta)(fl(x) \times fl(y))
$$
- `A*x` can be approximated by $(A + \delta A)\mathbf{x}$

- So wish to estimate relative error as in
$$
\frac{||\delta \mathbf{Ax}||}{\mathbf{Ax}}
$$

### **Step 1: dot product**  

$$
{\rm dot}(𝐱, 𝐲) = (𝐱 + δ𝐱)^⊤ 𝐲
$$
where
$$
|δ𝐱| ≤  {n ϵ_{\rm m} \over 2-nϵ_{\rm m}} |𝐱 |,
$$  

Proved by a lemma and expanding out term by term, each has $\delta$ multiplication error and the addition error builds up  

$$
[x_1 y_1 (1+\delta_1) + x_2 y_2 (1+\delta_2)](1+\gamma_2) 
$$
$$
\to [[\dots](1+\gamma_2)+x_3 y_3 (1+\delta_3)](1+\gamma_3) \to \cdots
$$  
which eventually becomes  

$$
\sum x_j y_j (1+\theta_j) = \sum x_j y_j + \sum \theta_j x_j y_j 
$$  
So the error vector $\delta x$ is  

$$
\mathbf{\delta x} = \begin{pmatrix}
x_1 \theta_1 \\ 
x_2 \theta_2  \\
\vdots \\
x_m \theta_m

 \end{pmatrix} 
$$

### **Step 2: matrix-vector**  

Note that  
$$
{\rm mul}(A, 𝐱) = \begin{pmatrix}
{\rm dot}(A[1,:], \mathbf{x})\\
{\rm dot}(A[2,:], \mathbf{x})\\
\vdots  \\
{\rm dot}(A[m,:], \mathbf{x})\\
\end{pmatrix}
$$
So result in step1 naturally extends.  

Taken from notes
$$
{\rm mul}(A, 𝐱) = (A + δA) 𝐱
$$
where
$$
|δA| ≤ {n ϵ_{\rm m} \over 2-nϵ_{\rm m}}  |A|.
$$
Therefore
### **Result**  

$$
\begin{aligned}
\|δA\|_1 &≤  {n ϵ_{\rm m} \over 2-nϵ_{\rm m}} \|A \|_1 \\
\|δA\|_2 &≤  {\sqrt{\min(m,n)} n ϵ_{\rm m} \over 2-nϵ_{\rm m}} \|A \|_2 \\
\|δA\|_∞ &≤  {n ϵ_{\rm m} \over 2-nϵ_{\rm m}} \|A \|_∞
\end{aligned}
$$  

### **Use the Condition Numbers**  

$$
\frac{||\delta \mathbf{Ax}||}{\mathbf{Ax}} \leq \kappa(\mathbf{A}) \ \varepsilon
$$  

where for a square matrix $A$, the condition number in $p$-norm is  
$$
κ_p(A) := \| A \|_p \| A^{-1} \|_p
$$
with the $2$-norm:
$$
κ_2(A) = {σ_1 \over σ_n}.
$$  

The bound is proved by considering $\mathbf{y} = \mathbf{Ax}$, so  

$$
\frac{||x||}{||Ax||} \leq ||A^{-1}||
$$  

thus   

$$\frac{||x||}{||Ax||} \frac{||\delta A x||}{||x||} \leq ||\delta A|| \ ||A^{-1}|| \leq \kappa \frac{||\delta A||}{||A||}$$


