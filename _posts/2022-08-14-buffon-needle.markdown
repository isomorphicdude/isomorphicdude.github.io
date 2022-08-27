---
layout: post
title: "Buffon's Needle"
permalink: /2022-08-14/
usemathjax: true
categories: Probability-and-Statistics
math: true
mathjax: true
---  

# **Using Buffon's Needle to estimate $\pi$**  

Buffon's needle is an experiment proposed by French mathematician Georges LeClerc, Comte de Buffon. By dropping a needle randomly onto a plane with lines placed at a fixed distance apart, we can count the number of times the needle intersects the lines.    

<p align="center">
<img src="./../assets/buffon.svg">
</p>
<p align="center">
<em>Figure 1: A buffon needle (orange) </em>
</p>

Here we will use needles of length $1$ unit and lines also $1$ unit apart.  

To interpret the condition of dropping a needle randomly, we need to make the following assertions:  

- We assert that the distance from the centre of the needle to the line immediately below it $Z$ follows a $Unif(0,1)$ distribution, $Z \sim Unif(0,1)$  

- We assert that the *acute* angle $\Theta$ the needle makes with one of the lines (counting counter-clockwise) satisfies $\Theta \sim Unif(0,\pi/2)$  (Note that we can also use an angle made with the line immediately below it modulo $\pi$)   

- The random variables $\Theta$ and $Z$ are independent  


Therefore, we can integrate over the regions where intersection occurs  

$$
 \mathcal{A} = \{z \leq \frac{1}{2}\sin \theta  \} \cup \{ 1-z \leq \frac{1}{2} \sin \theta\}
$$  

with density function $f(z,\theta) = \frac{2}{\pi}$  

The result is  

$$
\int_{\mathcal{A}} f(z,\theta) dz d\theta = \frac{2}{\pi}
$$  

Instead of actually dropping the needles, we can write a `C++` program to verify this (but note $\pi$ still appears in the program)  

```cpp
double buffon_needle(int num_sim){
	// random number generator for centre to nearest line
	int num_intersect = 0;
	random_device seed;
	mt19937 gen(seed());
	uniform_real_distribution<> unif(0,1);
	uniform_real_distribution<> unif_ang(0,1);
	
	// sample the needles
	for (int i = 0; i<num_sim; ++i){
		// random angle
		// note sine of a uniformly distributed angle
		// is not uniform
		double theta = unif_ang(gen) * std::numbers::pi;
		double z = unif(gen);

		// take the length of the needle to be 1
		double dist =  sin(theta) / 2;

		if ((z <= dist)||(1-z <= dist)){
			// check intersection
			++num_intersect;
		}

	}

	double approx = (1.0 * num_intersect) / (1.0 * num_sim);  

	approx = 2.0 / approx; 

	return approx;
}
```  

The result is not too bad but we can certainly do better.  

```cpp
The approximation is 3.14387                                      
The real value is 3.14159  
```  

Since if we let the intersection be a Bernoulli random variable $Y \sim Bern(\frac{2}{\pi})$ and its variance is given by $\frac{2}{\pi}(1-\frac{2}{\pi}) \approx 0.2313$, which is certainly not very ideal.   

An improvement that can be made is to use *Buffon's cross*, which is simply two needles welded together by the centre and are orthogonal to each other.    

<p align="center">
<img src="./../assets/buffon_cross.svg">
</p>  

<p align="center">
<em>Figure 2: A buffon cross (orange) </em>
</p>

```cpp  

double buffon_cross(int num_sim){
	// random number generator for centre to nearest line
	int num_intersect = 0;
	random_device seed;
	mt19937 gen(seed());
	uniform_real_distribution<> unif(0,1);
	uniform_real_distribution<> unif_ang(0,1);

	// sample the needles
	for (int i = 0; i<num_sim; ++i){
		// note we used acute angle to account for cos
		double theta = unif_ang(gen) * std::numbers::pi * 0.5;
		double z = unif(gen);

		double sin_dist =  sin(theta) / 2;
		double cos_dist =  cos(theta) / 2;

		if ((z <= sin_dist)||(1-z <= sin_dist)){
			++num_intersect;
		}
		if ((z <= cos_dist)||(1-z <= cos_dist)){
			++num_intersect;
		}
	}

	double approx = (0.5 * num_intersect) / (1.0 * num_sim);  

	approx = 2.0 / approx; 

	return approx;
}

```  
This gives a method of lower variance.  

Let $I$ be the indicator of the event that the first needle intersects a line, and let $J$ be the indicator that the second needle intersects a line.  

$$
	\mathbb{E}(I) = \mathbb{E}(J) = \frac{2}{\pi}
$$  

Now let $X=I+J$ be the indicator of the event that the cross intersects with the parallel lines, we estimate the variance of $X/2$.  

$$
	Var(\frac{X}{2}) = \frac{1}{4} (\mathbb{E}(I^2)+\mathbb{E}(J^2)+2\mathbb{E}(IJ)) - \frac{1}{4}(\mathbb{E}(X)^2)  
$$  

It suffices to compute $\mathbb{E}(IJ)$. Note that two intersections will occur simultaneously only when $z \leq \frac{1}{2} \min (\sin \theta, \cos \theta)$ or $1 - z \leq \frac{1}{2} \min (\sin \theta, \cos \theta)$, where $\theta$ is an acute angle made with the parallel line by one of the needle.  


$$
	\mathbb{E}(IJ) = 2\int_0^{\frac{\pi}{2}} \int_0^{\frac{1}{2} \min(\sin \theta, \cos \theta) } f(z,\theta) \ dz d\theta
$$  

By considering the symmetry of $\sin$ and $\cos$ in $[0, \pi/2]$ and the symmetry of the $z$ and $1-z$ cases, we obtain  

$$
	\mathbb{E}(IJ) = \dfrac{4}{\pi}\bigg(1-\dfrac{1}{\sqrt{2}}\bigg)
$$  

And we see this variance $Var(\frac{X}{2}) = \frac{3-\sqrt{2}}{\pi}-\frac{4}{\pi^2}$ which is less than $\frac{2}{\pi}(1-\frac{2}{\pi})$ from Buffon's needle.  

An experiment will easily verify the results above but we will leave it here and just provide the result of a single trial.  

```cpp 
The approximation by needle is: 3.14497                                                                                                                                                                                            
The approximation by cross is: 3.14109                                                                                                                                                                                             
The real value is 3.14159 
```






