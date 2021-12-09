---
layout: post
title: "Groups Sheet 1"
permalink: /2021-12-09/
usemathjax: true
categories: Groups and Rings
math: true
mathjax: true
---


## Question 6  

(a) We define a homomorphism 
$\phi_B$: $A \times B \mapsto B$, 
where $\phi_B(a,b)=b$. This is clearly a surjective homomorphism and it has kernel

$$ker(\phi_B)=\{(a,e_{B}) | a \in A\}=A$$ 

Now by the first isomorphism thm. 
$G/ A \cong B$. The other case is analogous.  

(b) It's easy to check that $A_1 \times B_1$ is indeed a normal subgroup of $G$.
We construct a homomorphism 

$$\phi : G / (A_1 \times B_1) \mapsto A/A_1\times B/B_1$$


$$(a,b)A_1 \times B_1 \mapsto aA_1 \times bB_1$$

The multiplicativity and surjective are immediate. For injectivity, we have:

$$\begin{aligned}
\phi ((a,b)A_1 \times B_1) &= A_1 \times B_1 \\ 
aA_1 &=A_1 
\\bB_1 &=B_1
\end{aligned}$$

So $(a,b)A_1 \times B_1=A_1 \times B_1$ and $\phi$ is an isomorphism. From this we can
induct to get the result in the notes.