---
layout: post
title: "MATH50003 Week3"
permalink: /2022-01-29/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---

# Week 3
## **Structured Matrices**

### **Dense**
- **Dense vector** Sequence squeezed together of $np$ bits, where each element is in $p-bit$ representation, has **length** and **pointer**  

```julia
Base.unsafe_load(pointer(x))
sz = sizeof(eltype(x)) # getting element type in array
Base.unsafe_load(pointer(x)+1*sz) # gets the next element 

Base.unsafe_load(pointer(x)+20*sz) # accessing outside
#As the array is stored in continguous blocks in memory
```  
- **Dense matrix** Sequence of vectors squeezed $(v_1, v_2,\cdots, v_n)^T$
```julia
# can check matrix storage
A = [1 2; 4 5; 7 8]
vec(A) # 1 4 7 2 5 8
```
- **Matrix Multiplication** 
> - normally  $O(mn)$ complexity
> - Can be reduced to $O(m)$
### **Triangular**
Solution with **forward/back** substitution
```julia
using LinearAlgebra
data = [1 2 3; 4 5 6; 7 8 9]
U = UpperTriangular(data)
L = LowerTriangular(data)
``` 
### **Banded**
A type of sparse matrix
Complexity of $O(n)$.  
$l, u$ for number of lower and upper bands  
Only store the bands in memory
- **Diagonal**
$l=u=0$
- **Bi-diagonal**
$\{l,u\}=\{0,1\}$
in first order odes
- **Tri-diagonal**
$l=u=1$
in second order odes

```julia
D = Diagonal(randn(n))
T = Tridiagonal(randn(n-1), randn(n), randn(n-1))
```

## **Premuation Matrices**

### **Permuations**
A **bijection** from set to itself. Using two rows notation, sort columns when finding inverse permutation  

### **Action on vector**
- Permute to $(v_{\sigma(1)}, \cdots, v_{\sigma(n)})$
- Permuation is a linear map
- Find the matrices of the linear maps by consdiering canonical vectors $Pe_k=e_j$, *i.e.* the transpositions $(k,j)$
- Take identity matrix arranging the $1$ in each **row** according to above
### **Permuation Matrices**
- Permuation matrices are orthogonal (inverse is transpose)  

```julia
# Creating permutation matrix
P = I(5)[v,:] 
# v is the bottom row of cauchy notation of permutation

# I(5) is identity matrix
```

## **Orthogonal Matrices**
All orthogonal matrices are products of rotations and reflections  

### **Rotations**
$$
Q_θ := \begin{pmatrix} \cos \theta & -\sin \theta \cr \sin \theta & \cos \theta \end{pmatrix}
$$  
Rotations perform better than lower triangular matrices, as the latter is numerically unstable.  

### **Reflections**
Define $\bar{v} = \frac{x}{||x||}$, the reflection matrix $Q_v$ is given by $Q_{\bar{v}}=I-2\bar{v} \bar{v}^T$, reflection across $x$
- $Q_{\bar{v}}x=-x$

- $Q_{\bar{v}}^T = Q_{\bar{v}}$
  
- $Q_{\bar{v}}Q_{\bar{v}}^T=I$  

**Householder Relfection**  

$$
y= \mp ||x||e_1+x
$$  

Choose $v$ as normalized $y$, then $Q=I-2\bar{v} \bar{v}^T$ relfects $x$ to the positive/negative $x-axis$. (positive for minus sign).  

Note that `sign(x1)` is often used to avoid numerical instability when applying the `-` sign.  