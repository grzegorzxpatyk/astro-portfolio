---
date: '2025-02-13'
title: 'Astro script reinitialization/cleanup with lifecycle hooks'
---
Today I was working on simple button component in Astro, that would appear in navbar, when I've came accross one particular issue: 
>event handlers were not working after navigation. 

I was using `<ClientRouter />` so there was client side navigation enabled. I was looking for events that astro is firing on navigation when I've came across this [docs page](https://docs.astro.build/en/reference/modules/astro-transitions/#lifecycle-events).

In my case the most usefull were `astro:before-swap` and `astro:after-swap`. Then I've came across this implementation on [stack overflow](https://stackoverflow.com/a/77910937/17349882) that resembled `useEffect` hook from React. 

That's how I implemented it:
```html
<button
    class='ml-auto cursor-pointer rounded bg-zinc-950 px-4 py-2 font-bold text-zinc-50 active:scale-95'
    type='button'
    data-button
>
    Click me!
</button>
<span data-message>Message will be displayed here</span>
<script>
    function init() {
        const button = document.querySelector('[data-button]');
        const message = document.querySelector('[data-message]');

        async function fetchData(): Promise<{title: string; [x: string]: string}> {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 10 + 1)}`
            );
            const data = await response.json();
            return data;
        }

        async function handleClick(event: Event) {
            const data = await fetchData();
            if (!message) return;
            message.innerHTML = data.title;
        }

        if (!button) return;
        button.addEventListener('click', handleClick);

        document.addEventListener(
            'astro:before-swap',
            () => {
                button.removeEventListener('click', handleClick);
            },
            { once: true }
        );
    }
    init();

    document.addEventListener('astro:after-swap', init);
</script>

```