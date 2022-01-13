---
layout: post
title: "MATH50003 Week1"
permalink: /2022-01-13/
usemathjax: true
categories: Numerical Analysis
math: true
mathjax: true
---

# Week 1
## Unsigned Integers 

- Pre-define the number of bits needed to store, say $p$  

- Just pad before the binary e.g. $101 \rightarrow 00000101$ if $p=8$
- When overflow, use modular, e.g. if $p=8$, then $11111111+00000001=0 \ mod \ 2^8$

## Signed  

- Prepend extra $1$ to number if negative, $0$ if positive

- Interpreted as the $n+2^{p-1} \ mod \ 2^p$, 
  **e.g.**   
  
$$
(10000101)_2=(101)_2+2^7 \ mod \ 2^8 = -(123)_{10}
$$
```julia
# Can parse integers in Julia
u = parse(UInt8, "10000101"; base=2) # unsigned 8 bit
x = reinterpret(Int8, u)
```

## Variable bit-length
- In Julia can make big integer
```julia
x = big(10)
y = (x^x)^x
```

## Real Numbers in Binary
- $(101.011)_2=(101)_2+\frac{0}{2}+\frac{1}{2^2}+\frac{1}{2^3}$

- $(0.333 \cdots)_{10}=\sum(1/4)^k=(0.01010\cdots)_2$
- using geometric series
## Floating Point Numbers
$$
\underbrace{s}_{sign-bit} \quad \underbrace{q_{Q-1}\cdots q_{0}}_{Q-exponent} \quad \underbrace{b_1 \cdots b_S}_{S-significant}
$$  

- Total no. of bits is $1+Q+S$  
  
- Shift: $\sigma$  
  
- Unsigned integer part (base $2$) is the $Q$ part $2^q=2^{(q_{Q-1}\cdots q_{0})_2}$  


### Normal
- $0<q<2^Q-1$, not all zero or one
- represented by $2^{q-\sigma}(1\ . \ b_1 \cdots b_S)$, note the numbers after point does not necessarily correspond to those in base ten

- double precision $64 \equiv 1023,11,52$, where they are shift, exponent, and significant resp. $1+11+52=64$
- also single and half $32 \equiv 127,8,23, \quad 16 \equiv 15,5,10$
- **e.g.** $\frac{1}{3} = 2^{-2}(1.0101\cdots) = 2^{13-15}(1.0101010101)$ in $16$ bits, with the $q=13=01101$ being exponent bit, $0$ as sign, $15$ comes from convention of half precision
### Sub-normal
- All zeros for exponent so $2^{1-\sigma}(0.something)$
### Special
- All ones in exponent

- If all significant are zeros, then infinity, `Inf` and `-Inf`
- Otherwise, not a number `NaN` for `0/0`

## Floating Pt. Arithmetic

### Rounding  
- rounding **up**, **down**, and **nearest** (when tied, pick num w/ $0$ in last bit), the **nearest** is the default

- Note all in binary, up $1.0101 \rightarrow 1.0110$, down and nearest $1.0101 \rightarrow 1.0100$

### Arithmetic

- non-associativity due to underflowing **e.g.** $(2^{-11}+1)+2^{-11}=1+2^{-11}=1$

- evaluating exactly is difficult


### Bounding Errors

- Absolute error $\tilde{x}=x+\delta_a$, then 
  $|\delta_a|$ is the error

- Relative error $\tilde{x} = x(1+\delta_r)$,
  then $|\delta_r|$ is the error

- Error in computers is **Machine epsilon**, usually $\epsilon_m=2^{-s}$, where $s$ is the no. of bits in significant digits

- If $x$ is inside the normal range, then rounding has relative errors, where crude bounds are given by  

$$
\begin{aligned}
|\delta^{near}| \ & \leq \ \frac{\epsilon_m}{2} \\
|\delta^{up}| \ & \leq \ \epsilon_m \\
|\delta^{down}| \ & \leq \ \epsilon_m \\
\end{aligned}
$$  

- Error bound at every arithmetic step
