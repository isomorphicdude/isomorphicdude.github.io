---
layout: post
title: "Brownian Motion 2"
permalink: /2023-07-28/
usemathjax: true
categories: Probability-and-Statistics
math: true
mathjax: true
---   

>  A sequel to the previous post on Brownian Motion. We introduce Wiener Measure, the Blumenthal 0-1 Law, and the Strong Markov Property.   

> Update (04 March 2024): I simplified the blog to make it more readable.


# Wiener Measure  

- Let $C(\mathbb{R}\_{+}, \mathbb{R})$ be the set of continuous functions from $\mathbb{R}_+$ to $\mathbb{R}$.  
  
- Define the $\sigma-$algebra $\mathcal{L}$ as the smallest $\sigma-$algebra such that for all $t\geq 0$, the projection map $t \mapsto w(t)$ is measurable. 

Now let $\Omega$ be the usual sample space, we consider:  

$$
\begin{aligned}
    \Omega &\rightarrow C(\mathbb{R}_+, \mathbb{R}) \\
\omega &\mapsto (t \mapsto B_t(\omega))
\end{aligned}
$$

This is a measurable map, since when composed with the projection map, we get a random variable 

> (Let the map above be $f$ and $f \circ g_t=B_t$, so $f^{-1}(g_t^{-1}(B))$ is measurable, as $g_t^{-1}(B)$ form the generator of sigma algebra on $C(\mathbb{R}_+, \mathbb{R})$).  
  

The **Wiener measure** is then given by the probability measure:  

$$
W(A) = \mathbb{P}(B_. \in A)
$$  

for all $A \in \mathcal{L}$ and $B_.$ denotes any random continuous function $t\mapsto B_t(\omega)$.  

## Explicit Form of Wiener Measure  

To obtain an explicit formula for this measure, we can consider the cylinder sets of the form:  

$$
A = \{w \in C(\mathbb{R}_+, \mathbb{R}): w(t_0) \in A_0, \dots, w(t_n) \in A_n\}
$$

where $0=t_0 < \ldots < t_n$, which by our formula in the previous post, we have:  

$$
\begin{aligned}
W(A) &= \mathbb{P}(B_{t_0}\in A_0, \dots, B_{t_n} \in A_n) \\
&= \mathbf{1}_{A_0}(0) \int_{A_1 \times \cdots A_n} \frac{\exp\left(-\sum_{i=1}^n\frac{(x_{i}-x_{i-1})^2}{2(t_i-t_{i-1})}\right) dx_1\ldots dx_n}{(2\pi)^{n/2} \sqrt{t_1(t_2-t_1)\ldots (t_n-t_{n-1})}} 
\end{aligned}
$$  

To see this actually uniquely defines a measure, we apply the [*Monotone Class Lemma*](#monotone-class-lemma), the details of which are left to the end of the post.  

The consequence of the preceeding formula is that the Wiener measure (the law of the Brownian motion) is uniquely defined: 
> For distinct Brownian motions $B_1, B_2$, we have $\mathbb{P}(B_1 \in A) = \mathbb{P}(B_2 \in A)$ for some $A \in \mathcal{L}$

When the probability space is $\Omega = C(\mathbb{R}_+, \mathbb{R})$, we have the **canonical process**,
$$
X_t(w) = w(t)
$$
which is a Brownian motion 
> Continuity follows from the definition of $C(\mathbb{R}_+, \mathbb{R})$ and finite-dimensional distribution follows from the formula above.    

This is called the **canonical construction of Brownian motion**.  

# Blumenthal 0-1 Law  

The natural filteration of BM: $\mathcal{F}_t = \sigma(B_s: s \leq t)$  

$$
\mathcal{F}_{0+} = \bigcap_{t>0} \mathcal{F}_t
$$    

> Note the difference between this and the future sigma algebra $\mathcal{F}\_{\infty} = \bigcap\_{n\geq 1} \sigma(X_n, X_{n+1}, \ldots)$.  

<div class="transparent-box">
   <b>Blumenthal 0-1 Law</b>
   The $\sigma-$algebra $\mathcal{F}_{0+}$ is trivial, i.e. for all $A \in \mathcal{F}_{0+}$, $\mathbb{P}(A) \in \{0,1\}$.
</div>    

A proof is given [here](https://math.stackexchange.com/questions/3249710/proof-of-blumenthals-0-1-law-for-brownian-motion), note the two applications of Monotone Class Lemma; we also include some details in the [section below](#monotone-class-lemma).  

Now we give the applications. 

## Sample Path Properties  

In a not so formal way, we can say the Brownian paths are "unstable".  

<div class="transparent-box">
   <b>Sample Path Properties 1</b>
   Almost surely for every $\varepsilon > 0$, there is
   $$
   \sup_{0\leq s \leq \varepsilon} B_s > 0 \qquad \text{and} \qquad \inf_{0 \leq s \leq \varepsilon} B_s < 0
   $$
</div>

> The superemum and infimum are defined using the intersection with $\mathbb{Q}$, since the Brownian motion is continuous, this gives the desired measurability.

To see this, define a set with $\varepsilon_p \downarrow 0$, $p\in \mathbb{N}$,

$$
A = \bigcap_p \left\{\sup_{0\leq s \leq \varepsilon_p} B_s > 0\right\}
$$

then $A \in \mathcal{F}_{0+}$.

> note the events are decreasing and each event is in the intersection of $\mathcal{F}\_t$ for $t \in [0, \varepsilon\_p]$, so the intersection is in $\mathcal{F}\_{0+}$.  

Now simply note   

$$
\mathbb{P}(A)=\lim \mathbb{P}(\sup_{0\leq s \leq \varepsilon_p} B_s > 0) \geq \mathbb{P}(B\_{\varepsilon_p}>0)=1/2
$$ 

by symmetry, so $\mathbb{P}(A)=1$. The other assertion is proved by replacing $B_s$ with $-B_s$.   

A consequence of this result is the **non-monotonicity** of the Brownian motion.  

<div class="transparent-box">
   <b>Corollary</b>
   Almost surely, the function $t \mapsto B_t$ is not monotone on any interval.
</div>

For every rational $q\in\mathbb{Q}$, replace $s=t-q$ in property 1 above and use the simple Markov property to get the desired result.

Another sample path property is that the Brownian motion blows up almost surely.

<div class="transparent-box">
   <b>Sample Path Properties 2</b>
   Almost surely for every $a \in \mathbb{R}$, define the <i>hitting time</i> by $T_a = \inf\{t \geq 0: B_t = a\}$, then $T_a < \infty$ almost surely. Consequently, we have almost surely, 
    $$
    \limsup_{t \to \infty} B_t = \infty \qquad \text{and} \qquad \liminf_{t \to \infty} B_t = -\infty
    $$
</div>  

We sketch the proof below.  

- A continuous function $f$ takes any value in $\mathbb{R}$ if and only if $\limsup f = \infty$ and $\liminf f = -\infty$.  

- We now show the probability $\mathbb{P}(\sup\_{t\geq 0} B_t > M)=1$ for all $M>0$

- Note from the previous property, we have   

$$
\mathbb{P}(\sup_{0\leq t \leq 1} B_t > 0) = \lim_{\delta \to 0} \mathbb{P}(\sup_{0\leq t \leq 1} B_t > \delta) =1
$$

- Using a rescaling of Brownian motion $B_t^{\delta} = 1/\delta B_{\delta^2 t}$, we have  

$$
\mathbb{P}(\sup_{0\leq t \leq 1/\delta^2} B_t^{\delta} > 1 ) = 1
$$ 

- Using the definition of [Wiener measure](#wiener-measure), we have for any $M>0$:  

$$
\begin{aligned}
\lim_{\delta \to 0} \mathbb{P}(\sup_{0\leq t \leq 1/\delta^2} B_t^{\delta} > 1) &=
\lim_{\delta \to 0} \mathbb{P}(\sup_{0\leq t \leq 1/\delta^2} B_t> 1) \\
&= \lim_{\delta \to 0} \mathbb{P}(\sup_{0\leq t \leq M^2/\delta^2} B_t > M) \\
\end{aligned}
$$

This shows $\mathbb{P}(\sup\_{t\geq 0} B_t > M)=1$ for all $M>0$ and for the infimum, we can use $-B_t$ instead.  

# Strong Markov Property   

> An extremely useful property of the Brownian motion is the strong Markov property, as it allows for some explicit computations.  

The **stopping time** $T$ is a random variable in $[0, \infty]$ such that $\{T \leq t\} \in \mathcal{F}_t$ for all $t\geq 0$.  

> When we have a random variable $X_T$, we really mean a composition of maps $\omega \to (T(\omega), \omega)$ and $(t, \omega) \to X_t(\omega)$.  

> The value of $T=\infty$ is allowed and note that for a stopping time $\\{T <t\\}=\bigcup\_{q\in [0,t) \cap \mathbb{Q}} \\{T\leq q\\} \in \mathcal{F}_t$. 

For a stopping time $T$, the **$\sigma-$algebra of the past before $T$** is defined as:  

$$
\mathcal{F}_T = \{A \in \mathcal{F}: A \cap \{T \leq t\} \in \mathcal{F}_t \text{ for all } t\geq 0\}
$$  

> We can verify that $\mathcal{F}_T$ is indeed a $\sigma-$algebra, union and empty set are easy to check, for complements, we check for $A\in \mathcal{F}\_T$, $A^c \cap \\{T\leq t\\} = \\{T\leq t\\} \setminus (A \cap \\{T\leq t\\}) \in \mathcal{F}\_t$.

It is easy to see $T$ is measurable wrt. $\mathcal{F}_T$.  

Now we claim the random variable $\mathbf{1}\_{\{T<\infty\}} B_T$ is $\mathcal{F}_T-$measurable.  

Indeed, we can write it as a pointwise limit of simple functions:    

$$
\mathbf{1}_{\{T<\infty\}} B_T = \lim_{n\to \infty} \sum_{k=1}^{\infty} \mathbf{1}_{\{i2^{-n} \leq T < (i+1)2^{-n}\}} B_{i2^{-n}}
$$  

> We can check this by plugging in $\omega$ and use continuity of Brownian motion.  

In addition, the random variables $\mathbf{1}\_{s<T}B\_{s}$ is measurable.  

Now we state the strong Markov property.  

<div class="transparent-box">
   <b>Strong Markov Property</b>
   Let $T$ be a stopping time and $B$ be a Brownian motion, then the random variable
    $$
    B_t^{(T)} = \mathbf{1}_{\{T<\infty\}} (B_{T+t}-B_T)
    $$  
    is independent of $\mathcal{F}_T$ and is a Brownian motion.  

</div>

Again, we only sketch the proof here. 

- It suffices to show that $\forall A \in \mathcal{F}_T$ and $F$ bounded and measurable, we have  

$$
\mathbb{E}[\mathbf{1}_A F(B_{t_1}^{(T)}, \ldots, B_{t_n}^{(T)})] = \mathbb{E}[\mathbf{1}_A] \mathbb{E}[F(B_{t_1}^{(T)}, \ldots, B_{t_n}^{(T)})]
$$  

- The independence and distribution follows similarly to the [Blumenthal 0-1 Law](#blumenthal-0-1-law).  

> To show this identity, we need to "break apart" the random variable $B_t^{(T)}$ using an indicator function as above, then we can use the simple Markov property to get the desired result, namely:  

- Denote $[T]_n$ as the smallest integer $k$ such that $k2^{-n} \leq T < (k+1)2^{-n}$ 
$$
\begin{aligned}
\mathbb{E}[\mathbf{1}_A F(B_{t_1}^{(T)}, \ldots, B_{t_n}^{(T)})] &= \lim_{n\to \infty} \mathbb{E}[\mathbf{1}_A F(B_{t_1}^{[T]_n}, \ldots, B_{t_p}^{[T]_n})] \\
&= \lim_{n\to \infty} \sum_{k=0}^\infty \mathbb{E}[\mathbf{1}_A \mathbf{1}_{\{k2^{-n} \leq T < (k+1)2^{-n}\}} F(B_{k2^{-n}+t_1}-B_{k2^{-n}}, \ldots, B_{k2^{-n}+t_p}-B_{k2^{-n}}] \\
\end{aligned}
$$
by the Dominated Convergence Theorem.  

> Recall $B_t\to 0$ as $t\to 0$, so we can construct the difference in the limit

Now note the product of indicator functions is measurable wrt. $\mathcal{F}\_{k2^{-n}}$ which allows us to use the simple Markov property to get the desired result.  


## The Reflection Principle 

<div class="transparent-box">
   <b>Reflection Principle</b>
   Let $B$ be a Brownian motion and $a>0$, define $S_t = \sup_{s\leq t} B_s$, then for $a\geq 0$ and $b\leq a$, we have
    $$
    \mathbb{P}(S_t \geq a, B_t \leq b) = 2\mathbb{P}(B_t \geq 2a-b)
    $$  
    In addition, $S_t$ has the same distribution as $|B_t|$.
</div>

The trick is to note that:   

$$
\mathbb{P}(S_t \geq a, B_t \leq b) = \mathbb{P}(T_a \leq t, B_t \leq b) = \mathbb{P}(T_a \leq t, B_{t-T_a}^{(T_a)} \leq b-a)
$$  

since $B\_{t-T_a}^{(T_a)} = B_t - B_{T_a}=B_t - a$ on the event $\\{T_a \leq t\\}$. 

Now we can use the strong Markov property to get independence between $T_a$ and $B\_{t-T_a}^{(T_a)}$, so replacing $B\_{t-T_a}^{(T_a)}$ with a random variable with the same distribution is allowed:

$$
\begin{aligned}
\mathbb{P}(T_a \leq t, B_{t-T_a}^{(T_a)} \leq b-a) &= \mathbb{P}(T_a \leq t, -B_{t-T_a}^{(T_a)} \leq b-a) \\
&= \mathbb{P}(T_a \leq t, B_t \geq 2a-b) \\
&= \mathbb{P}(B_t \geq 2a-b) \\
\end{aligned}
$$ 

as one event is contained in the other.  

<div class="transparent-box">
   <b>Corollary</b>
   The distribution of $T_a$ then follows as

$$
f(t) = \frac{a}{\sqrt{2\pi t^3}} \exp\left(-\frac{a^2}{2t}\right)
$$

where this density is supported on $t\geq 0$.

</div>



# Extension to $\mathbb{R}^d$  

We first extend to arbitrary starting points.  

If $Z$ is a real random variable, a process $(X_t)_{t\geq 0}$ is a **real Brownian motion** starting from $Z$ if $X_t = Z + B_t$ where $B$ is a standard Brownian motion.   

A $d-$ **dimensional Brownian motion** is a process $B_t = (B_t^1, \ldots, B_t^d)$ where $B_t^i$ are independent real Brownian motions starting from $0$. Similarly, we can define a $d-$dimensional Brownian motion starting from $Z\in \mathbb{R}^d$ by $B_t = Z + (B_t^1, \ldots, B_t^d)$, where $Z$ is independent of $B_t^i$.  

> Note there is dependence between the components of the Brownian motion starting from $Z$.  


# Monotone Class Lemma

We need first the definition of a monotone class. A sub-collection of sets $\mathcal{M} \subseteq \mathcal{P}(\Omega)$ is a **monotone class** if   

- $\Omega \in \mathcal{M}$
- $A, B \in \mathcal{M}$ and $A \subseteq B$ implies $B \setminus A \in \mathcal{M}$
- $A_1 \subseteq A_2 \subseteq \cdots$ with $A_i \in \mathcal{M}$ implies $\bigcup_i A_i \in \mathcal{M}$  

**Examples:** 
- The sets $\\{A \in \mathcal{F}: \mu(A) = \nu(A) \\}$ form a monotone class, where $\mu, \nu$ are measures on $\mathcal{F}$.

- The sets $\\{A \in \mathcal{F}: A \ \mathrm{indepenent \ of} \ \mathcal{G} \\}$ form a monotone class, where $\mathcal{G} \subset \mathcal{F}$ is a sub-$\sigma-$algebra.  

We will denote the smallest monotone class containing a collection $\mathcal{C}$ by $\mathcal{M}(\mathcal{C})$, in other words,  

$$
\mathcal{M}(\mathcal{C}) = \bigcap_{\mathcal{C} \subseteq \mathcal{M} \text{ monotone class}} \mathcal{M}
$$  

<div class="transparent-box">
   <b>Monotone Class Lemma</b>
   If $\mathcal{C}$ is stable under finite intersections, then $\mathcal{M}(\mathcal{C})=\sigma(\mathcal{C})$.

</div>  

We omit the proof here but give the applications mentioned in the sections above.  

## Definition of Wiener Measure  

Recall that we gave an explicit measure on the cylinder sets $A$ and we would like to show this concurs with the Wiener measure. Denote this explicit measure as $\mu$ and the desired measure as $\nu$. Also let $\mathcal{A}$ be the collection of cylinder sets, which is stable under finite intersection. Using the first example,   

$$
\mathcal{L} = \{A \in \mathcal{P}(C(\mathbb{R}_+, \mathbb{R})): \mu(A) = \nu(A)\}
$$  

is a monotone class and thus $\sigma(\mathcal{A})=\mathcal{M}(\mathcal{A}) \subseteq \mathcal{L}$.  

## Independence in Blumenthal 0-1 Law  

Recall that we showed using continuity
$$
\mathbb{E}[\mathbf{1}_A F(B_{t_1}, \ldots, B_{t_n})] = \lim_{\varepsilon\to 0} \mathbb{E}[\mathbf{1}_A F(B_{t_1}-B_{\varepsilon}, \ldots, B_{t_n}-B_{\varepsilon})]
$$

then by simple Markov property, we have indepedence of this finite collection of random variables with $A \in \mathcal{F}\_{0+}$. Now we can use the second example to get the desired result. Namely, let $\mathcal{A}$ be the collection of algebras generated by the finite collection of random variables $B_{t_1}, \ldots, B_{t_n}$, which is stable under finite intersection, we have

$$
\mathcal{L} = \{A \in \mathcal{F}\_{0+}: A \ \mathrm{independent \ of} \ \mathcal{A}\}
$$  

is a monotone class and thus $\sigma(\mathcal{A})=\mathcal{M}(\mathcal{A}) \subseteq \mathcal{L}$.

