---
layout: post
title: "Tupper's self-referential formula"
permalink: /2021-12-09/
usemathjax: true
categories: Computer Science
math: true
mathjax: true
---

# Tupper's self-referential formula

So here is a formula that generates a bitmap image. We can take appropriate $N$'s and generate all kinds of images of size $106 \times 17$. 

$$
\frac{1}{2} \leq \left \lfloor{mod(\lfloor{\frac{y}{17}}\rfloor \times 2^{-17\lfloor{x}\rfloor-mod(\lfloor{y}\rfloor, 17)},2)}\right \rfloor 
$$  

One way to do this is to record the bit value for each pixel: namely $1$ if colored, and $0$ otherwise; then take the strings of bits and concantenate them, convert the strings to base $10$ and multiply by $17$, this is the $N$.  (note that the concatenation will be from right to left while collection of columns will be from right to left). And then we take   

$$0\leq x<106$$

$$N\leq y<N+17$$  

So the point $(x,y)$ is colored.  

## Sketch of Proof:  
For simplicity, assume $x$ and $y$ are both integers. Our goal is to prove that given a bitmap flattened to a binary string $s$, which encodes the information that the $(17x+p)^{th}$ bit is $1$ iff $(x,N+p)$ is colored, then the inequality evaluated at each point is an indicator of coloring.   


WLOG, $y=17q+r$, then the inequality can be rewritten as  

$$
\frac{1}{2} \leq mod(q \times 2^{-17x-r},2)
$$  

Note $mod(q \times 2^{-17x-r},2)$ is exactly the $(17x+r)^{th}$ binary entry of $q$, since we have for any base $10$ integers $n$, the expansion:  

$$
n = \sum_{i=0}^{k} 2^ia_i
$$  
It is thus immediate that $mod(\frac{n}{2^i},2)$ gives $1$ when that digit is $1$ in the binary expansion.  
Now it is clear that given the $(17x+p)^{th}$ entry being $1$, we have $y\cong p =r \ mod17$, as given $17 | N$, so the inequality is an indeed an indicator given the construction of string $s$.  

## Remark  
It is also easy to generate the formula. It suffices to realize that when we have a bitmap, we can choose to encode it as a binary string and map the position as well as the state of that digit to cartesian coordinates.  

For higher resolution, we may increase the value of $106$ and $17$.  

## Implementation in Python


