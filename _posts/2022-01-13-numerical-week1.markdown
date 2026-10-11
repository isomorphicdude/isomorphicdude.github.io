---
layout: post
title: "MATH50003 Week1: Numbers"
permalink: /2022-01-13/
usemathjax: true
categories: Numerical-Analysis
math: true
mathjax: true
---

> **Update 11 10 2026**: Fixed and added stuff.

- We are interested in the representation of numbers in computers, which are finite sequences of bits in the memory. 

- We will focus on the standard representation introduced by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) in 1985.


# Examples

## Unsigned Integers  

- Represented by $p$ bits (hence represents all no.s below $2^{p}$)
- Padding before the binary e.g. $101 \rightarrow 00000101$ if $p=8$
- When overflow, use modular, e.g. if $p=8$, then for $255+1$, we have in binary $11111111+00000001=0 \ \mod 2^8$

## **Signed Integers**

- Prepend extra $1$ to number if negative, $0$ if positive

- Interpreted as the $n+2^{p-1} \ \mod \ 2^p$, 
  **e.g.**   
  
$$
(10000101)_2=-2^7 + 2^2 + 2^0 = -(123)_{10}
$$  

```julia
# Can parse integers in Julia
u = parse(UInt8, "10000101"; base=2) # unsigned 8 bit
x = reinterpret(Int8, u)
```   

## Real Numbers in Binary  

- $(101.011)_2=(101)_2+\frac{0}{2}+\frac{1}{2^2}+\frac{1}{2^3}$

- $(0.333 \cdots)_{10}=\sum(1/4)^k=(0.01010\cdots)_2$
- using geometric series  

## Converting Real Numbers to Binary

- Convert the magnitude of the number, keeping its sign separately. 
- For the integer part, repeatedly divide by $2$ and read the remainders in reverse order.
- For the fractional part, repeatedly multiply by $2$: record the integer part ($0$ or $1$) as the next binary digit, then continue with the remaining fractional part.  

### Example  

Given $\frac{1}{3}=(0.3333\cdots)_{10}$. 

- First, $2\times\frac{1}{3}=\frac{2}{3}$: record $0$, leaving $\frac{2}{3}$.
- Next, $2\times\frac{2}{3}=\frac{4}{3}=1+\frac{1}{3}$: record $1$, leaving $\frac{1}{3}$.
- The remainder is back to the starting value, so the digits $01$ repeat: $\frac{1}{3}=(0.010101\cdots)_2$.
- Stop if the remainder becomes zero; otherwise, a finite bit budget requires truncating or rounding the expansion. 
  - $\frac{1}{3}$ has no exact finite binary representation.

  
# Floating Point Numbers (IEEE 754)
The floating point numbers is a union of three types of numbers: the **normal**, **sub-normal**, and **special** numbers. We use notations:

$$F_{\sigma,Q,S}:=F_{\sigma,Q,S}^{\mathrm{normal}}\cup F_{\sigma,Q,S}^{\mathrm{sub}}\cup F_{\sigma,Q,S}^{\mathrm{special}}.$$  

When stored, we have:

$$
\underbrace{s}_{sign-bit} \quad \underbrace{q_{Q-1}\cdots q_{0}}_{Q-exponent} \quad \underbrace{b_1 \cdots b_S}_{S-significant}
$$  

- Total no. of bits is $1+Q+S$, where 
  - the first one is the *sign bit*, 
  - the next $Q$ bits are the *exponent*, 
  - and the last $S$ bits are the stored *fraction bits* of the significand (often called the mantissa).
  
- $\sigma$ is the *exponential shift*; required to represent negative exponents (as $q_{Q-1}\dots q_{0}$ is unsigned integer)
  - *i.e.* $2^q=2^{(q_{Q-1}\cdots q_{0})_2}$  


## Normal  

We have the binary representation:  

$$F_{\sigma,Q,S}^{\mathrm{normal}}:=\left\{\pm 2^{q-\sigma}\times\left(1.b_1b_2b_3\ldots b_S\right)_2:1\leq q<2^Q-1\right\}.$$

- $0<q<2^Q-1$, not all zero or one (see special numbers)
  
- Represented by $2^{q-\sigma}(1\ . \ b_1 \cdots b_S)$, $(1\ . \ b_1 \cdots b_S)$ is in binary  

- The usual $64$, $32$, and $16$ bit floating point numbers are:  

$$
\begin{aligned}
  F_{64} &:= F_{1023,11,52} \\
  F_{32} &:= F_{127,8,23} \\
  F_{16} &:= F_{15,5,10}
\end{aligned}
$$  

- The no. of bits is $1+Q+S$
  

### Example 1

With $\frac{1}{3}$ in `Float16`. The exact binary expansion is $\frac{1}{3}=2^{-2}(1.010101\cdots)_2$. 

- With exponent bias $\sigma=15$ in $F_{16}$, the stored exponent is $q=-2+15=13=(01101)_2$, and the sign bit is $0$. 
- The mantissa is truncated (not rounded up)
- The full $16$ bits are $0\;01101\;0101010101$, representing the approximation

$$
\operatorname{fl}_{16}\!\left(\frac{1}{3}\right)
=2^{13-15}(1.0101010101)_2
=\frac{1365}{4096}
=0.333251953125.
$$

```julia
x = Float16(1/3)
bitstring(x) # "0011010101010101"
Float64(x)  # 0.333251953125
```

### Example 2

- The commonly used [`bf16` (bfloat16)](https://cloud.google.com/blog/products/ai-machine-learning/bfloat16-the-secret-to-high-performance-on-cloud-tpus) is $F_{127,8,7}$: $1$ sign bit, $8$ exponent bits, and $7$ stored fraction bits, giving $16$ bits in total. 
- **Why is the leading bit implicit?** The mantissa bits start with $1$. The format stores only the digits after the binary point and reconstructs the leading $1$ when interpreting a normal number. The seven fraction bits are stored explicitly.
- **Example:** $6.5=(110.1)_2=2^2(1.101)_2$. In `bf16`, the stored fraction is $1010000$; the leading $1$ in $1.1010000$ is implicit. With $q=2+127=129=(10000001)_2$, the full bit pattern is $0\;10000001\;1010000$.

- **Subnormal exception:** when the exponent field is all zeros, the implicit leading bit is $0$ instead, giving $(0.b_1\cdots b_7)_2$ with scale $2^{1-127}$. See [bfloat16 format specification](https://github.com/riscv/riscv-bfloat16/blob/main/doc/riscv-bfloat16-format.adoc).

  

### **Smallest and Largest**  

- **Smallest Normal Number** is $2^{1-\sigma}(1.b_1 \cdots b_S)_2$ with the bits being zero. (Note mantissa starts with $1$)  

$$
\min\left|F_{\sigma,Q,S}^{\mathrm{normal}}\right|=2^{1-\sigma}
$$

- **Largest Normal Number** is $2^{2^Q-1-1-\sigma}(1.11\cdots 1)_2$   

$$
\max |F^{\mathrm{normal}}_{\sigma,Q,S}|=2^{2Q-2-\sigma}(1.11\ldots)_{2}=2^{2Q-2-\sigma}(2-\epsilon_{m})
$$   

- Note the exponent of all ones is reserved for the special numbers so one must be subtracted from $2^Q-1$.  


## **Sub-normal**

Sub-normal numbers are represented by  

$$
F_{\sigma,Q,S}^{\mathrm{sub}}:=\left\{\pm 2^{1-\sigma}\times\left(0.b_1b_2b_3\ldots b_s\right)_2\right\},
$$  

where the exponent is all zeros and the mantissa starts with $0$ instead of $1$.

- e.g. in $F_{64}$, it is $2^{1-1023}$ and with mantissa starting with $0$.  
- the difference between two normal numbers can be smaller than the smallest normal number

```julia
# in Float16, the smallest normal is 2^-14
x = 0 00001 1000000000  = 1.5 × 2⁻¹⁴ ≈ 9.155e-5
y = 0 00001 0000000000  = 1.0 × 2⁻¹⁴ ≈ 6.104e-5
x − y = 2⁻²⁴ → 0 00000 0000000001  # (the smallest subnormal)
```

## **Machine Epsilon**   

$$
\epsilon_m = 2^{-S}
$$   

- $S$ is the number of stored fraction bits, excluding the implicit leading bit.  


## **Special**
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


# **Floating Pt. Arithmetic**

## **Rounding**  
- We consider rounding **up**, **down**, and **nearest** operations:

$$
\begin{aligned}
  \mathrm{fl}^{\mathrm{up}}_{\sigma,Q,S}(x)&:=\min\{y\in F_{\sigma,Q,S}:y\ge x\} \\
  \mathrm{fl}^{\mathrm{down}}_{0,Q,S}(x) &:= \max\{y \in F_{0,Q,S} : y \le x\} \\
  \mathrm{fl}^{\mathrm{nearest}}_{\sigma,Q,S}(x) &:= \arg\min_{y \in F_{\sigma,Q,S}} |y-x|
\end{aligned}
$$

- Usually, we are interested in rounding a higher precision number to its lower precision version. For a given number with no. of mantissa bits greater than $S$,

$$
x = 2^{q-\sigma}(1.b_1b_2\ldots b_Sb_{S+1}\ldots)_2
$$

we convert it to

$$
\begin{aligned}
x_- &:= \operatorname{fl}^{\mathrm{down}}(x)=2^{q-\sigma}(1.b_1b_2\ldots b_S)_2\\
x_+ &:= \operatorname{fl}^{\mathrm{up}}(x)=x_-+2^{q-\sigma-S}
\end{aligned}
$$  

- e.g. rounding up $1.0101 \rightarrow 1.0110$, down and nearest $1.0101 \rightarrow 1.0100$

## Arithmetic

- For $x, y \in F_{\sigma,Q,S}$, each operation computes the exact result and then rounds it:

$$
x \oplus y := \mathrm{fl}(x+y), \qquad x \ominus y := \mathrm{fl}(x-y), \qquad x \otimes y := \mathrm{fl}(x \times y), \qquad x \oslash y := \mathrm{fl}(x / y).
$$

- For real $x, y$, the inputs are rounded first, so computing $x+y$ gives $\mathrm{fl}(x) \oplus \mathrm{fl}(y)$. If $x, y$ are already floats, then $\mathrm{fl}(x)=x$ and only the operation itself rounds.

- **Non-associativity** (caused by rounding): in `Float16` ($S=10$), $1+2^{-11}$ is a tie between $1$ and $1+2^{-10}$, and it rounds to $1$ because that value has last bit $0$. So

$$
(1 \oplus 2^{-11}) \oplus 2^{-11} = 1 \oplus 2^{-11} = 1, \qquad 1 \oplus (2^{-11} \oplus 2^{-11}) = 1 \oplus 2^{-10} = 1 + 2^{-10}.
$$

- **Absorption** (not overflow): if $\lvert y\rvert$ is less than half the gap between floats near $x$, then $x \oplus y = x$. In `Float64`, $10^{100} \approx 2^{332.2}$, so $\mathrm{fl}(10^{100}) = 2^{332}(1.b_1 \cdots b_{52})_2$   

$$
\mathrm{fl}(10^{100}) \oplus 1 = \mathrm{fl}\big(2^{332}(1.b_1 \cdots b_{52})_2 + 1\big) = \mathrm{fl}(10^{100}).
$$

- Likewise, `Float64` represents every integer with $\lvert n\rvert \le 2^{53}$ exactly. Beyond $2^{53}$ the gap is at least $2$, **e.g.** $2^{53} \oplus 1 = 2^{53}$.

- **Input rounding**: $0.1 = (0.0\overline{0011})_2$ and $1.1$ have recurring binary expansions, so they are rounded on input:

```julia
(Float16(1.1) - 1) / Float16(0.1)  # result is Float16(0.996), not 1
```


## Bounding Errors

For each rounding $\mathrm{mode}$ (up, down, nearest), we can write the floating point representation of a real number $x$ in normal range as

$$\mathrm{fl}^{\mathrm{mode}}(x)=x(1+\delta_x^{\mathrm{mode}})$$

where we have  

$$
\begin{aligned}
|\delta_x^{\mathrm{nearest}}| &\le \frac{\epsilon_{\mathrm{m}}}{2} \\
|\delta_x^{\mathrm{up/down}}| &< \epsilon_{\mathrm{m}}.
\end{aligned}
$$  

- **Absolute error**: write $\tilde{x} = x + \delta_a$, then the absolute error is $\lvert \delta_a\rvert = \lvert \tilde{x} - x\rvert$.

- **Relative error**: write $\tilde{x} = x(1+\delta_r)$, then the relative error is $\lvert \delta_r\rvert = \lvert \tilde{x} - x\rvert / \lvert x\rvert$.

- The same holds for each operation, since it is exact followed by rounding: $x \oplus y = (x+y)(1+\delta)$ with $\lvert \delta\rvert \leq \frac{\epsilon_m}{2}$ (round to nearest), provided $x+y$ is in the normal range. The same applies to $\ominus, \otimes, \oslash$.

- **Strategy**: attach a factor $(1+\delta_i)$ to every rounding, then collect them at the end and drop the $O(\epsilon_m^2)$ terms.

- **e.g.** Computing $(1.1 - 1)/0.1$ in floating point gives

$$
\begin{aligned}
(\mathrm{fl}(1.1) \ominus 1) \oslash \mathrm{fl}(0.1)
&= \frac{\big(1.1(1+\delta_1) - 1\big)(1+\delta_2)}{0.1(1+\delta_3)}(1+\delta_4) \\
&= (1 + 11\delta_1)(1+\delta_2)(1+\delta_4)(1+\delta_5),
\end{aligned}
$$

- using $1.1(1+\delta_1) - 1 = 0.1(1+11\delta_1)$ and $\frac{1}{1+\delta_3} = 1+\delta_5$, where $\lvert \delta_5\rvert \leq \frac{\lvert \delta_3\rvert}{1-\lvert \delta_3\rvert} = \frac{\epsilon_m}{2} + O(\epsilon_m^2)$.

- With each $\lvert \delta_i\rvert \leq \frac{\epsilon_m}{2}$, the result is $1+\delta$, where

$$
|\delta| \leq (11 + 1 + 1 + 1)\frac{\epsilon_m}{2} + O(\epsilon_m^2) = 7\epsilon_m + O(\epsilon_m^2).
$$

- Check in `Float16` ($\epsilon_m = 2^{-10}$): the computed value is $0.99609375$, with error $2^{-8} \approx 0.0039 \leq 7\epsilon_m \approx 0.0068$.
