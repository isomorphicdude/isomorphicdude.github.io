---
layout: post
title: "Conditioning as Disintegration"
permalink: /2024-12-25/
usemathjax: true
categories: Probability-and-Statistics
math: true
mathjax: true
---   

> Taken from [Chang and Pollard, Statistica Neerlandica 1997](http://www.stat.yale.edu/~jtc5/papers/ConditioningAsDisintegration.pdf). Also see chapters on regular conditional probabilities in Pollard's book.
> 
> This is ported from my Obsidian notes, so there might be some formatting issues.

## Disintegration of Measures

### Set up
- $(\mathcal{X}, \mathcal{A},\lambda)$ and $(\mathcal{T}, \mathcal{B}, \mu)$ are measure spaces with a measurable map $T:\mathcal{X}\to \mathcal{T}$ 

- We require both $\lambda$ and $\mu$ are sigma-finite

- Here we denote $\lambda \\{ T=t \\}\equiv \lambda(\mathbf{1}[x \in\\{ T=t \\}])$

- Integrals are denoted as linear functionals $\lambda_{t}f=\int f d\lambda_{t}$
	- with $\mu^tf$ denoting integration w.r.t. the variable $t$

- With the push-forward denoted as $T\lambda (B)=\lambda (T^{-1}(B))$ for some measurable set $B\in \mathcal{B}$

---

### Definition

We say $\lambda$ has a **disintegration** $\\{\lambda_{t}\\}_t$ w.r.t. $(T,\mu)$ if:

1. (*Concentration*) $\lambda_{t}$ is a sigma-finite measure on $\mathcal{A}$ concentrated on $\\{ T=t \\}$, with $\lambda_{t}\\{ T\neq t \\}=0$ for $\mu$-almost every $t \in \mathcal{T}$. 
 
> so functions with $g(Tx)=g(t), \lambda_{t}-a.s.$

and for each non-negative, measurable $f$ on $\mathcal{X}$

2. (*Measurability*) $t\mapsto \lambda_{t}f$ is measurable 

3. (*Mixing*) $\lambda f=\mu^t (\lambda_{t}f)$
	- which should read as $\int f d\lambda=\int (\int f d\lambda_{t})d\mu^t$

> I call this mixing since $\mu$ is the mixing measure here (similar to GMM)


We assume the existence of disintegrations here with some extra topological constraints, *which makes the result stronger than the Kolmogorov definition of conditional probability, but also less general*. 

--- 

The following theorem characterises the disintegration $\lambda_{t}$:  

### Theorem (sigma-finite)

Let $\lambda_{t}$ have a $(T,\mu)$ disintegration with conditions above.

> (**Densities**) If we assume $\rho$ to be s.t. $\rho \ll \lambda$ and has density $r(x)$. Then the usual $\lambda_{t}$ disintegration exists, and we have $\rho_{t}\ll \lambda_{t}$, where the density is **also** $r(x)$

1 (***Absolute continuity***) The image measure satisfies $T\lambda \ll \mu$ , with density of $T\lambda$ being $\lambda_{t}\mathcal{X}$  

- With density, image measure has $T\rho\ll \mu$ with density $\lambda_{t}r$

> i.e. the density is the measure of whole space under the disintegration  


2 (***Finite and Sigma-finite***) We have the following equivalence  

$$
\{ \lambda_{t} \} \text{ are finite for all } t \mu-a.e. \iff T\lambda \ \text{is $\sigma$-finite}
$$  

- similar results for $\rho_{t}$  


> this gives condition to normalise $\lambda_{t}$ into a probability measure  

3  (***Disintegration as Probability***)   

$$  
\{ \lambda_{t} \} \text{ are probabilities for all } t  \mu-a.e. \iff T\lambda=\mu
$$  

- similar for $\rho_{t}$  

> this directly characterises the probability, and in many use-cases we set $\mu$ as the push-forward of $\lambda$.  

4 (***Normalising to Probability***) If $T\lambda$ is sigma-finite and $(T\lambda)\\{ \lambda_{t} \mathcal{X}=0 \\}=0$ and $(T\lambda)\\{ \lambda_t \mathcal{X} =\infty \\}=0$. For $T\lambda$-almost all $t$, the measures:  

$$
\tilde{\lambda}_{t}(\cdot) = \frac{\lambda_{t}(\cdot)}{\lambda_{t}\mathcal{X}}\left\{0<\lambda_{t}\mathcal{X}<\infty\right\}
$$  

are probabilities which give a $(T,T\lambda)$ disintegration.

- Having densities allows us to write:

$$
\tilde{\rho}_{t}(f)=\frac{\lambda_{t}(f r)}{\lambda_{t}r}\left\{0<\lambda_{t}r<\infty\right\}
$$
	
> Note here restricted to the sets where the measure is finite and positive. This is global, which is in contrast with the Kolmogorov definition. 

**Proof**:

**1**  
Suffice to note the following equalities, writing $\lambda_{t}\mathcal{X}=\ell(t)$  

$$
\int g(t)(T\lambda)(d t)=\int g(T x)\lambda(d x)=\int \int g(T x)\lambda_{t}(d x)\mu(d t)=\int\!g(t)\ell(t)\mu(d t)
$$  

which shows $\ell(t)$ is indeed the density (here $g$ is arbitrarily measurable)

**2**  

We use the fact that a [Measure is sigma-finite iff there is a finite integral of positive function](https://math.stackexchange.com/questions/1134136/%CE%BC-is-%CF%83-finite-iff-lpx-contains-a-strictly-positive-function). There exists $h(t)$ s.t. $\lambda h(t)<\infty$.   

So *for the first direction*, assuming $\ell(t)<\infty$, we define   

$$
g(t)=\frac{h(t)}{1+\ell(t)},
$$  

which is strictly positive and thus $T\lambda$ is sigma-finite by substituting this into the integrals in 1.  

*Conversely*, if $T\lambda$ is sigma-finite, then there exists some $k(t)$ so $\int k(t)\ell(t)\mu(dt)<\infty$, which implies the finiteness of $\ell(t)$, hence $\lambda_{t}$.


**3**  

*First direction:* $\ell(t)=1$ then the equalities hold with arbitrary $g$ hence $T\lambda=\mu$. 

*Conversely*, choosing specific $g(t)=h(t)\\{\ell(t)<1\\}$ and $g(t)=h(t)\\{\ell(t)>1\\}$ shows the conditioning sets have measure zero.

**4**  

Simply expand the definition of disintegration, $\lambda f=\mu^{t}\lambda_{t}f$ and by definition  

$$
\mu^{t}\ell(t)\tilde{\lambda}_{t}f+\mu^{t}(\\{\ell(t)=0\\}\lambda_{t}f)+\mu^{t}(\\{\ell(t)=\infty\\}\lambda_{t}f)
$$  

which equals $(T\lambda)^{t}\lambda_{t}f$.

---

## Existence and Uniqueness of disintegration

**Theorem 1 (Existence Theorem)**  
- Let $\lambda$ be a *sigma-finite* *Radon* measure on a metric space $\mathcal{X}$ 

- and let $T$ be a measurable map from $\mathcal{X}$ into $(T, \mathcal{B})$. 

- Let $\mu$ be a sigma-finite measure on $\mathcal{B}$ that *dominates* the image measure $T\lambda$.  

If $\mathcal{B}$ is countably generated and contains *all* the singleton sets $\\{t\\}$, then $\lambda$ has a $(T, \mu)$-disintegration.  

The $\lambda_t$ measures are *uniquely* determined up to an almost sure equivalence: if $\\{\lambda_t^*\\}$ is another $(T, \mu)$-disintegration, then:
$$
\mu\{t \in T : \lambda_t \neq \lambda_t^*\} = 0.
$$
> See the original article's appendix for a proof.

---
> I now include some example use cases of disintegration, which appear frequently in statistics courses.

## Example: Sufficient Statistics $T(\theta)$

> The proof of the following well-known theorem characterising sufficiency (in a frequentist setting) is often omitted. We adapt the proof from the original article, which uses the disintegration theorem.  

We let $(\mathcal{X}, \lambda)$ be the base space where the measure $\mathbb{P}$ has a density.
<div class="transparent-box">
  The statistic $T(x), x \in \mathcal{X}$ is <b>sufficient</b> if and only if the density admits the factorisation:
$$
p(x,\theta) = g(Tx, \theta) h(x)
$$
for measurable functions $g$ and $h$.
</div>    

> Here we refine the definition of *sufficiency* as:
> The disintegration of $T, \lambda$ does not depend on $\theta$, 
> *i.e.* the measure $P\_{t}(\cdot)=\mathbb{P}(\cdot\vert T=t)$ does not depend on $\theta$, and this ${P}_{t}$ is **shared** for all parameters $\theta$

**Proof with disintegration:**

We re-write with the set up of the theorem above:

- $(\mathcal{X},\lambda)$ is the usual Borel
- $\rho$ is the probability measure $\mathbb{P}_{\theta}$ with density $p(x,\theta)$
- $\lambda_{t}$ is the disintegration with Lebesgue, and we have $\rho_{t}\ll \lambda_{t}$ with density $p(x,\theta)$
- Image measure $T\rho$ has density $\lambda_{t}r=\rho_{t} \mathcal{X}$


**Assuming factorisation:**

This is similar to the discrete case. We let the density on $(\mathcal{X}, \lambda)$ be:  

$$
\frac{d\mathbb{P}_{\theta}}{d\lambda}=p(x,\theta) = g(Tx, \theta) h(x)
$$  

and using the identity above:  

$$
\tilde{\rho}_{t}(f)=\frac{\lambda_{t}(f r)}{\lambda_{t}r}\left\{0<\lambda_{t}r<\infty\right\}
$$  

we have:  

$$
\mathbb{P}_{\theta,t}(f)={\frac{\lambda_{t}^{x}g(T x,\theta)h(x)f(x)}{\lambda_{t}^{x}g(T x,\theta)h(x)}}\{0<\lambda_{t}^{x}g(T x,\theta)h(x)<\infty\}
$$  

By the theorem and concentration of $\lambda_{t}$, we have:  

$$
0<\lambda_{t}^xg(T x,\theta)h(x)=g(t,\theta)\lambda_{t}h<\infty
$$   

for all $t, T\mathbb{P}_{\theta}-$almost surely. So we can cancel out the factor containing $\theta$.

> Note that the $>0$ and $<\infty$ guarantees the fraction is well-defined.

**Assuming sufficiency**

We first replace $\lambda$ with a base dominating probability measure constructed from a countable subset of $\theta$ parameters:  

$$
\mathbb{P}=\sum_{i}2^{-i}\mathbb{P}_{\theta_{i}},
$$  

Now let $P_{t}$ be the common disintegration of all $\mathbb{P}_{\theta}$, which is possible as we now assume sufficiency.  

$$
(T\mathbb{P})^{t}P_{t}f=\sum_{i}2^{-i}(T\mathbb{P}_{\theta_{i}})^{t}P_{t}f=\mathbb{P}f
$$  

so ${P}_{t}$ is also a disintegration of $\mathbb{P}$.

Define the density $g(t,\theta)$:  

$$
g(t,\theta) = \frac{d T\mathbb{P}_{\theta}}{dT\mathbb{P}}
$$  

$$
\begin{align}
\mathbb{P}_{\theta}f &= (T\mathbb{P}_{\theta})^t P_{t} f \qquad \text{definition of disintegation} \\
&= (T\mathbb{P})^t g(t,\theta)P_{t}f \qquad \text{construction of }g(t,\theta) \\
&=\mathbb{P}g(Tx,\theta)f \qquad \text{shared disintegration}
\end{align}
$$  


this shows:  

$$
\frac{d\mathbb{P}_{\theta}}{d\mathbb{P}} = g(Tx,\theta)
$$  

which gives:  

$$
\frac{d\mathbb{P}_{\theta}}{d\lambda} =  g(Tx,\theta) \frac{d\mathbb{P}}{d\lambda}
$$  

which is a desired factorisation.

> Note even though $\mathbb{P}$'s construction involves $\theta_{i}$ , we can choose not to include the current $\theta$ in the countable set (usually parameter space $\Theta$ is uncountable). 

---


## Example: Conditional Fisher Information

> This is an exercise from one of the problem sheets.

... The problem reduces to the identity (for a fixed $t$)  

$$
f_{X}(x;\theta)=f_{X\mid T}(x\mid t;\theta)f_{T}(t;\theta), \quad \forall x \in \{ Tx=t \}
$$  

To show this identity, note that for any measurable, non-negative function $g$, by definition of the disintegration, we have:  

$$
\int_{\{ Tx=t \}} g(x) f_{X}(x,\theta) dx = \int_{s\in \mathcal{T}} \int_{\{ Tx=s \}} g(x) f_{X\vert T}(x\ \vert\ s,\theta) f_{T} (s;\theta) \mathbf{1}\{ Tx=t \} ds dx 
$$  

but the only nonzero part of the RHS is given by (note $t\to f(x\vert T,\theta)$ is also measurable):  

$$
\int_{\{ Tx=t \}} f_{X\vert T}(x\ \vert\ t,\theta) f_{T} (t;\theta) g(x) dx
$$  

which proves the identity.

> In the original question, the formula does not have the restriction $x \in \\{ Tx=t \\}$, which causes some confusion.

This can be used to show  

$$
i_{X}(\theta)= i_{X\vert T}(\theta) +i_{T}(\theta)
$$  


---

## Example: The Gluing Lemma

> We can use this lemma to show that the Wasserstein-p distance satisfies the triangle inequality

### Set up

-  $(X,\mathcal{P}(X)), (Y,\mathcal{P}(Y)),(Z,\mathcal{P}(Z))$ be three Polish probability space

- With $\mu \in \mathcal{P}(X), \nu \in \mathcal{P}(Y), \omega \in \mathcal{P}(Z)$. 

- $\pi_1 \in \Pi(\mu, \nu)$ and $\pi_2 \in \Pi(\nu, \omega)$ are couplings
 
- $P^{X \times Y}$ and $P^{Y \times Z}$ be the projection maps from $X \times Y \times Z$ to $X \times Y$ and $Y \times Z$ respectively. 

$$
P^{X\times Y} (x,y,z)=(x,y) \quad \text{and} \quad P^{Y\times Z}(x,y,z)=(y,z).
$$

### Result
Then there is a measure $\gamma \in \mathcal{P}(X\times Y\times Z)$ s.t.

$$
P^{X \times Y}_{\sharp}\gamma = \pi_1 \quad \text{and} \quad P^{Y \times Z}_{\sharp}\gamma = \pi_2.
$$

> when the context is clear, we omit $\sharp$ 

### Proof
Consider the projection map $T_{1}:(x,y) \mapsto y$ , then we can form a $(T_{1},\mu)$ disintegration to write for any measurable functions $g$:

$$
\int_{X\times Y} g(x,y) \pi_{1}(d(x,y)) =\int_{X} \int_{Y} g(x,y)\pi_{1,y}(dx)\ \nu(dy)
$$

> note that in fact the disintegration is on $X\times Y$ but by concentration we identify $\pi_{1}(A\times \\{  b \\}\vert y) \in \mathcal{P}(X\times Y)$ with the measure $\pi_{1}(A\vert y) \in \mathcal{P}(X)$

$$
\int_{Y\times Z} g(y,z) \pi_{2}(d(y,z)) =\int_{Y} \int_{Z} g(y,z)\pi_{2,y}(dz)\ \nu(dy)
$$

We can now define the gluing measure $\gamma(x,y,z)$ again by defining for every measurable function $g$ on $X\times Y\times Z$:

$$
\int_{X\times Y \times Z} g(x,y,z) \gamma(d(x,y,z)) = \int_{X\times Y\times Z}g(x,y,z) \pi_{1,y}(dx) \pi_{2,y}(dz) \nu(dy)
$$

which finishes the proof.


### Wasserstein-p distance satisfies the triangle inequality

> The following is form Chapter 6 of [Villani, 2012](https://cedricvillani.org/sites/dev/files/old_images/2012/08/preprint-1.pdf)

Let $\mu, \nu,$ and $\omega$ be three probability measures on $\mathcal{X}$, and let $(X, Y)$ be an optimal coupling of $(\mu, \nu)$ and $(Y, Z)$ an optimal coupling of $(\nu, \omega)$ (for the cost function $c = d^p$). 

By the Gluing Lemma, there exist random variables $(X', Y', Z')$ with $\text{law}(X', Y') = \text{law}(X, Y)$ and $\text{law}(Y', Z') = \text{law}(Y, Z)$. In particular, $(X', Z')$ is a coupling of $(\mu, \omega)$, so 

$$
\begin{align}
W_p(\mu, \omega) &\leq \left( \mathbb{E} \, d(X', Z')^p \right)^{\frac{1}{p}} \\
&\leq \left( \mathbb{E} \left( d(X', Y') + d(Y', Z') \right)^p \right)^{\frac{1}{p}} \\
&\leq \left( \mathbb{E} \, d(X', Y')^p \right)^{\frac{1}{p}} + \left( \mathbb{E} \, d(Y', Z')^p \right)^{\frac{1}{p}} \\
&= W_p(\mu, \nu) + W_p(\nu, \omega),
\end{align}
$$

where the inequality leading to the third line is an application of the Minkowski inequality in $L^p(\mathbb{P})$, and the last equality follows from the fact that $(X', Y')$ and $(Y', Z')$ are optimal couplings. So $W_p$ satisfies the triangle inequality.




