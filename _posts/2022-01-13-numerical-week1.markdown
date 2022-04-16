---
layout: post
title: "MATH50003 Week1"
permalink: /2022-01-13/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---

# **Numbers**

## **Unsigned Integers**

- Represented by a finite number of bits on a computer say $p$  

- Padding before the binary e.g. $101 \rightarrow 00000101$ if $p=8$
- When overflow, use modular, e.g. if $p=8$, then $11111111+00000001=0 \ \mod 2^8$

## **Signed**

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

## **Variable bit-length**
- `big` integers in Julia  
```julia
x = big(10)
y = (x^x)^x
```  

## **Real Numbers in Binary**
- $(101.011)_2=(101)_2+\frac{0}{2}+\frac{1}{2^2}+\frac{1}{2^3}$

- $(0.333 \cdots)_{10}=\sum(1/4)^k=(0.01010\cdots)_2$
- using geometric series
## **Floating Point Numbers**  

$$
\underbrace{s}_{sign-bit} \quad \underbrace{q_{Q-1}\cdots q_{0}}_{Q-exponent} \quad \underbrace{b_1 \cdots b_S}_{S-significant}
$$  

- Total no. of bits is $1+Q+S$  
  
- Shift: $\sigma$  
  
- Unsigned integer part (base $2$) is the $Q$ part $2^q=2^{(q_{Q-1}\cdots q_{0})_2}$  


### **Normal**  

- $F^{\rm normal}_{\sigma,Q,S}=\{\pm 2^{q-\sigma} \times (1\ . \ b_1 \cdots b_S)_2\}$
- $0<q<2^Q-1$, not all zero or one  
  
- Represented by $2^{q-\sigma}(1\ . \ b_1 \cdots b_S)$, $(1\ . \ b_1 \cdots b_S)$ is in binary  

$$
\begin{aligned}
  F_{64} &:= F_{1023,11,52} \\
  F_{32} &:= F_{127,8,23} \\
  F_{16} &:= F_{15,5,10}
\end{aligned}
$$  
  
- **e.g.** $\frac{1}{3} = 2^{-2}(1.0101\cdots) = 2^{13-15}(1.0101010101)$ in $16$ bits, with the $q=13=01101$ being exponent bit, $0$ as sign, $15$ comes from $\sigma=15$ in $F_{32}$  

  
### **Sub-normal**
- $F^{\rm sub-normal}_{\sigma,Q,S}=\{\pm 2^{1-\sigma} \times (0\ . \ b_1 \cdots b_S)_2\}$  

- e.g. in $F_{64}$, it is $2^{1-1023}$ and with mantissa starting with $0$.  

### **Machine Epsilon**   

$$
\epsilon_m = 2^{-S}
$$   

$S$ is the number of mantissa bits.  

### **Smallest and Largest**  

- **Smallest Normal Number** is $2^{1-\sigma}(1.b_1 \cdots b_S)_2$ with the bits being zero. (Note mantissa starts with $1$)  

- **Largest Normal Number** is $2^{2^Q-1-1-\sigma}(1.11\cdots 1)_2$  
- Note the exponent of all ones is reserved for the special numbers so one must be subtracted from $2^Q-1$.  


### **Special**
- All ones in exponent

- If all significant are zeros, then infinity, `Inf` and `-Inf`   

```julia
printlnbits(Inf16)
# returns 0 11111 0000000000
```  
  
- Otherwise, not a number `NaN` for `0/0`

- Changing the mantissa bits to nonzero does not change `NaN`   
  
```julia
i = parse(UInt16, "0111110000010001"; base=2)
reinterpret(Float16, i)
# Still returns NaN16
```   


## **Floating Pt. Arithmetic**

### **Rounding**  
- rounding **up**, **down**, and **nearest** (when tied, pick num w/ $0$ in last bit), the **nearest** is the default

- Note all in binary, up $1.0101 \rightarrow 1.0110$, down and nearest $1.0101 \rightarrow 1.0100$

### **Arithmetic**

- non-associativity due to underflowing **e.g.** $(2^{-11}+1)+2^{-11}=1+2^{-11}=1$

- Overflowing causes $10^{100}+1=10^{100}$, as not enough mantissa bits are there to reflect the addition, in `Float64` the largest should be $2^{53}-1$ to reflect the plus one.  
e.g. 
$$
\begin{aligned}
  10&=2^3(1.01)_2 \\
  fl(10^{100}) \oplus 1 &=fl(2^{300}(1+2^{-2})^{100}) \oplus 1 \\
  &=fl(2^{300}(1.b_1\cdots b_{52})_2+2^{-300}) \\
  &=fl(10^{100})
\end{aligned}
$$  
  
- The recurring digits of numbers like $0.1$ and $0.2$ causes error in `Float16` or so as the mantissa bits cannot express fully. **e.g.** `Float16(0.1) / (Float16(1.1) - 1)` does not return `1`.


### **Bounding Errors**

- Absolute error $\tilde{x}=x+\delta_a$, then 
  $|\delta_a|$ is the error

- Relative error $\tilde{x} = x(1+\delta_r)$,
  then $|\delta_r|$ is the error
e.g.  
$$
\begin{aligned}
  (1.1-1)/0.1 &= fl(1.1) \ominus fl(1) \oslash fl(0.1) \\
  &=\frac{(1+\delta_2)[1.1(1+\delta_1)-1]}{0.1(1+\delta_3)} (1+\delta_4)
\end{aligned}
$$   
- and use common  $\frac{1}{1+\delta_3}=1+\delta_5$  

- Error in computers is **Machine epsilon**, usually $\epsilon_m=2^{-s}$, where $s$ is the no. of bits in significant digits

- If $x$ is inside the normal range, then rounding has relative errors, where crude bounds are given by  

$$
\begin{aligned}
|\delta^{near}| \ & \leq \ \frac{\epsilon_m}{2} \\
|\delta^{up}| \ & \leq \ \epsilon_m \\
|\delta^{down}| \ & \leq \ \epsilon_m \\
\end{aligned}
$$   

- Error is bounded at every arithmetic step and collected at the end using a crude machine epsilon to bound the absolute error
