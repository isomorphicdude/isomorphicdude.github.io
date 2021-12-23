---
layout: post
title: "A bit of combinatorics in the proof of Taylor"
permalink: /2021-12-20/
usemathjax: true
categories: Combinatorics
math: true
mathjax: true
---
# Problem  

We aim to show the following identity holds.  

$$
\frac{j!}{(\beta_1-1)!\beta_2!\cdots\beta_n!} + \cdots + \frac{j!}{\beta_1!\beta_2!\cdots(\beta_n-1)!} = \frac{(j+1)!}{\beta_1!\beta_2!\cdots \beta_n!}
$$  

We use a combinatorial argument. 
In the LHS, we can write each term as a product of binomial coefficients (they are essentially multinomial coefficients), for simplicity, we write only the first one  

$$
\binom{j}{\beta_1-1} \binom{j-(\beta_1-1)}{\beta_2} \cdots \binom{j-(\sum_{k=1}^n \beta_k)+1}{\beta_n}
$$

We claim that the LHS counts the total number of ways of drawing $n$ balls of different color from a urn without replacement considering order (i.e. we need to divide it by $n!$ to get the 'real' no. of ways), where we have $j+1$ balls in the urn with $n$ different colors and there are $\beta_k$ balls for each color $k$, $1\leq k \leq n$, $\sum_{k=1}^n \beta_k=j+1$.  

Indeed, the expression above can be interpreted as the number of ways in the case where we have made sure a ball of color $1$ has been selected. Now each term in the LHS can be interpreted analogously as the paragraph above; in each case, we fix a ball of color $k$.  

The RHS counts exactly the same thing. As it is just,  
$$
\binom{j}{\beta_1} \binom{j-\beta_1}{\beta_2} \cdots \binom{j-(\sum_{k=1}^n \beta_k)}{\beta_n}
$$  
