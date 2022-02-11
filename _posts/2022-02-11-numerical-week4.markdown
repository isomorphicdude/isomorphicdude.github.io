---
layout: post
title: "MATH50003 Week4"
permalink: /2022-02-11/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---


# **Week 4**

## **Decomposition and Least Sqs.**

Importance of decomposition due to the ease of invertibility, hence quicker solution to linear systems.

### **QR**  


$A=QR$
$Q$ orthogonal, $R$ right triangular (rectangular), last few rows of zeros  

$$  
\qquad A = Q R = \underbrace{\begin{bmatrix} 𝐪_1 | \cdots | 𝐪_m \end{bmatrix}}_{m × m}
\underbrace{\begin{bmatrix} × & \cdots & × \\ 
& ⋱ & ⋮ \\ 
&& × \\ 
&&0 \\ 
&&⋮ \\ 
&& 0 
\end{bmatrix}}_{m × n}
$$  

### **Reduced QR**  

- Drop the last few rows of zeros , the right triangular is now square and triangular. Also $Q$ becomes $\hat{Q}$ correspondingly

- If we take transpose and then decompose, we get kernel as the orthogonal space to row space is column kernel  
  


### **Least Squares**  


Mnimize
$$
||A \vec{x} - \vec{b}||
$$
- If square matrix and invertible then easily solved by inverse.
- Using **QR**:

$$
||QR\vec{x}-\vec{b}||=||Q^T(QR\vec{x}-\vec{b})||=||R\vec{x} - Q^T b||
$$

As orthogonal matrices keep norm.   
- So drop the zeros and minimize 
$$||\hat{R}\vec{x} - \hat{Q}^T b||$$ 

- if $A$ has full rank, then $\hat{R}$ is invertible (since orthogonal $Q$ has full rank, so dim of column span of rectangular $R$ is full, hence $\hat{R}$ invertible), so   

$$x=\hat{R}^{-1}\hat{Q}^Tb$$

### **Computing QR via Gram-Schmidt**

- Since $R$ is upper-triangular,  the span of first $k$ columns of $Q$ is the same as $A$.  

- First compute the 'coefficients' of G-S namely the dot product of already computed orthonormal vectors $q_k$ with the to be transformed basis vector $a_j$, store those $q_k^Ta_j$ as $r_{k,j}$ in $R$.  

$$𝐯_j := 𝐚_j - \sum_{k=1}^{j-1} \underbrace{𝐪_k^\top 𝐚_j}_{r_{kj}}𝐪_k$$  

- The diagonal entries $r_{j,j}$ are the norm of $v_j$, where
$$q_j=\frac{v_j}{||v_j||}$$ 

- Common G-S works over the columns of $R$ and fill each of them, when filling the $r_{k,j}$'s entries, we take $O(m)$, other norm computing stuff takes $O(1)$, so each column takes $O(mj)$, summing up gives $O(mn^2)$

### **Computing QR via Householder**
More numerically stable than **G-S**.

- Repeatedly apply the reflection matrix and use the property of Householder 
$$Q_{\mathbf{x}}\mathbf{x}=\pm ||\mathbf{x}||\mathbf{e_1}$$ 
to only keep the first entry

- After altering the first column, use modified second column as the $\mathbf{x}$ in Householder and apply to the sub-matrix (keeping first row and column fixed)
  
- Continue inductively

$$Q_2 Q_1A = \begin{bmatrix} 
\times & \times & \times & \cdots & \times \\

& \times & \times & \cdots & \times \\

 && ⋮ & ⋱ & ⋮ \\

 && \times & \cdots & \times \end{bmatrix}$$  

- So final $Q = Q_1 \cdots Q_n = (Q_n \cdots Q_1)^T$  

### **LU factorisation**  
- Repeatedly apply lower triangular matrices with one columns only to $A$

- Analogously as above, inductively apply to sub-matrices that are modified on the previous step; the lower triangular matrix has its columns 'move down' in the process

$$L_1 = \begin{bmatrix} 1 \\ -{a_{21} \over a_{11}} & 1 \\ ⋮ &&⋱ \\

 -{a_{n1} \over a_{11}} &&& 1

\end{bmatrix}$$  


$$L_2 = \begin{bmatrix} 1 \\ 
 & 1 \\ 
& -\frac{a_{32}^1}{a_{22}^1} & 1 \\
& ⋮ & & \ddots \\
& -\frac{a_{n2}^1}{a_{22}^1} & \cdots && 1
\end{bmatrix}$$  


- Now $L_n \cdots L_1 A = U$, and note by the properties of lower triangular matrices, can first move $L_k$ to RHS and invert by the fact
(inverse is the negative column)
$$
L_j^{-1}  = I - \begin{bmatrix} 𝟎_j \\ 𝐥_j \end{bmatrix} 𝐞_j^⊤
$$
- Also note the product of lower triangular is lower triangular.

### **PLU decomposition**  

- Apply permutation matrix to permute the largest entry to the first before **LU**.

- When getting back, use property that $P_{\sigma} L_j = \tilde{L_j} P_{\sigma}$, with ,($\sigma$ only changing the first $j$ entries) , the $\mathbf{l_j}$ above permuted by the last $j+1$permutation of $P_{\sigma}$.


### **Cholesky**
- The diagonal entries of a positive definite matrix are positive (simply take $x=e_k$, $x^T A x >0$)
$$
A = \begin{bmatrix} α & 𝐯^\top \\
                    𝐯   & K
                    \end{bmatrix} = \underbrace{\begin{bmatrix} \sqrt{α} \\ 
                                    {𝐯 \over \sqrt{α}} & I \end{bmatrix}}_{L_1}
                                    \underbrace{\begin{bmatrix} 1  \\ & K - {𝐯 𝐯^\top \over α} \end{bmatrix}}_{A_1}
                                    \underbrace{\begin{bmatrix} \sqrt{α} & {𝐯^\top \over \sqrt{α}} \\
                                     & I \end{bmatrix}}_{L_1^\top}.
$$  
- Induct down by the fact that subslices of positiv def. 

### **Speed and Stability**  

- **Cholesky** $>$ **LU** $>$ **QR** in terms of speed

- **Cholesky** and **QR** (Householder) $>$ **LU**, **PLU** is in theory unstable but normally stable








