---
layout: post
title: "MATH50003 Week6"
permalink: /2022-02-27/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---

# **Differential Equations**  

## **Preliminaries**  

**Goal**:  

To solve differential equations via finite differences and analyse convergence of algorithms.  

**Strategy:**  

- Fix some time range  
- Evaluate at time steps
- Discretize and solve a linear system
- Answer produced as a vector representing values at time steps.  

## **Indefinite Integration**  

**System to solve**:   

$$
\begin{aligned}
u(0) &= c \\
u'(x) &= f(x)
\end{aligned}
$$  

&nbsp;

**Methods to  use:**    

$$
\begin{aligned}
u'(x_k) &≈ {u(x_{k+1}) - u(x_k) \over h} ≈ {u_{k+1} - u_k \over h} \qquad\text{(Forward-difference)} \\
u'(m_k) &≈ {u(x_{k+1}) - u(x_k) \over h} ≈ {u_{k+1} - u_k \over h} \qquad\text{(Central-difference)} \\
u'(x_k) &≈ {u(x_k) - u(x_{k-1}) \over h} ≈ {u_k - u_{k-1} \over h} \qquad\text{(Backward-difference)} \\
u''(x_k) &≈ {u(x_{k+1}) - 2u(x_k) + u_{k-1} \over h^2} ≈ {u_{k+1} - 2u_k + u_{k-1} \over h^2} \qquad \text{(Second-derivatives)}
\end{aligned}
$$  

Construct linear systems and add initial condition as first row. Same matrix for first three but different RHS.  

$$
\begin{pmatrix}
𝐞_1^⊤ \\
D_h
\end{pmatrix} 𝐮^{\rm f} = \begin{pmatrix}
1 \\
-1/h & 1/h\\
& \ddots & \ddots \\
&& -1/h & 1/h
\end{pmatrix} 𝐮^{\rm f} = \begin{pmatrix} c \\ 𝐟^{\rm f} \end{pmatrix}
$$

## **Euler's Methods**  

&nbsp;

**System to solve:**  
$$
\begin{aligned}
u(0) &= c \\
u'(t)-a(t)u(t) &= f(t)
\end{aligned}
$$  

&nbsp;

**Methods to use**:  

Similar as above with $k = 1,2,\cdots, n-1$
$$
\begin{aligned}
{u_{k+1}-u_{k} \over h} - a(t_k)u_k &= f(t_k) \qquad\text{(Forward-Euler)} \\
{u_{k+1}-u_{k} \over h} - a(t_{k+1})u_k &= f(t_{k+1}) \qquad\text{(Backward-Euler)} \\
\end{aligned}
$$  

&nbsp;

**Forward-Substitution**  
$$
\begin{aligned}
u_1 &=c \\
u_{k+1} &= (1+ha(t_k))u_k + hf(t_k) \qquad \text{(Forward-Euler)} \\
u_{k+1} &= (1-ha(t_{k+1}))^{-1}(u_k + hf(t_{k+1})) \qquad \text{(Backward-Euler)} \\
\end{aligned}
$$   

&nbsp;

**System of equations**  

Usually re-casted from higher derivatives  
$$
\begin{aligned}
𝐮(0) &= 𝐜 \\
𝐮'(t) - A(t) 𝐮(t) &= 𝐟(t)
\end{aligned}
$$  
Use the forward-substitution as above but with matrices  
$$
\begin{aligned}
𝐮_1 &= c \\
𝐮_{k+1} &= 𝐮_k + h A(t_k) 𝐮_k + h 𝐟(t_k) \qquad \text{(Forward-Euler)} \\
𝐮_{k+1} &= (I- h A(t_{k+1})^{-1} (𝐮_k  + h 𝐟(t_{k+1})) \qquad \text{(Backward-Euler)}
\end{aligned}
$$  

&nbsp;

**Nonlinear systems**  

$$
𝐮' = f(t, 𝐮(t))
$$
becomes:
$$
𝐮_{k+1} = 𝐮_k + h f(x_k, 𝐮_k)
$$  
So can be solved similarly.  

## **Poisson with Dirichlet**  

$$
\begin{aligned}
u(0) &= c_0 \\
u'' &= f(x) \\
u(1) &= c_1 
\end{aligned}
$$  
with discretization  
$$
\begin{aligned}
u_0 &= c_0 \\
 {u_{k-1} - 2u_k + u_{k+1} \over h^2} &= f(x_k) \\
u_1 &= c_1
\end{aligned}
$$  
Matrix has first and last row being initial condition; middle part is the *graph Laplacian*

$$
T =\begin{pmatrix}
1 & 0 & \\
1 & -2 & 1 \\ & ⋱ & ⋱ & ⋱ \\
&& 1 & -2 & 1 \\
&&& 0 & 1 
\end{pmatrix}
$$  

Usually obtained from multiplying the above $T$ by  
$$
G = \begin{pmatrix}
1 & 0 & \\
-1/h^2 & 1 &  \\ & ⋱ & ⋱ & ⋱ \\
&&  & 1 & -1/h^2 \\
&&& 0 & 1 
\end{pmatrix}
$$  

So the equation becomes  

$$
GT=G \ \mathbf{f} \\
\implies \\
GT \mathbf{u} = \begin{pmatrix} c_0 \\f(x_2) - c_0/h^2 \\ f(x_3) \\ ⋮ \\ f(x_{n-2}) \\ f(x_{n-1}) - c_1/h^2 \\ c_1 \end{pmatrix}
$$  

where $GT$ is 
$$
\begin{pmatrix}
1 & 0 & \cdots & 0\\
0 & \frac{1}{h^2} \mathbf{\Delta} \\
\vdots && \ddots \\
0 & \cdots & &1
\end{pmatrix}
$$  
with 
$$
\mathbf{\Delta} = \begin{pmatrix}
 -2 & 1 \\
        1 & -2 & ⋱ \\
        & ⋱ &  ⋱ & 1 \\
        && 1 & -2  
        \end{pmatrix}
$$
which has LU decomposition and easily invertible.  

## **Convergence**  

**Consistency** and **Stability** needs to be shown  
- Consistent: discretization solves the probelm with bounded error
- Stability: operator norm of inverse discretization matrix does not blow up  

They are used in proving the following error converges to $0$
$$
\|𝐮ᶠ - 𝐮_{exact}\|_∞  = \|Δ^{-1} (Δ𝐮ᶠ - Δ𝐮)\|_∞  ≤ \|Δ^{-1}\|_∞  \| {\bf\delta} \|_∞ 
$$  
where $Δ$ is the discretization matrix, $𝐮ᶠ$ is the approximation, $\| {\bf\delta} \|_∞$ the error bound.  

See notes for more...  


