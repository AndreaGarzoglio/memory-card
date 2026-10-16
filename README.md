# Stand Memory

A memory card game themed on *JoJo's Bizarre Adventure: Golden Wind* (Part 5).

**Live demo:** https://memory-card-three-tau.vercel.app/

## About

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-react-new-memory-card) React course. The goal is to practice managing state with hooks while fetching and using data from an external API.

The assignment asks for:

- cards with images (and text) fetched from an external API
- a scoreboard with the current score and the best score
- a function that shuffles the cards every time one is clicked, also run when the component mounts

## How to play

Click each Stand only once. After every click the cards are shuffled. Pick a Stand you already clicked and your score resets to zero. Click every Stand without repeating one to win.

## How it works

- The Stands of Part 5 (name and image) are fetched from the [JoJo Wiki](https://jojowiki.com) MediaWiki API, inside a `useEffect` with a cleanup flag to ignore stale responses.
- Ten random Stands are shown at a time, and at least one of them is always one you haven't clicked yet, so the game can always be won.
- The current score is derived from the list of clicked Stands rather than stored separately.

## Built with

- React
- Vite
- Plain CSS

## Run locally

```bash
npm install
npm run dev
```

## Credits

*JoJo's Bizarre Adventure* and all its characters belong to Hirohiko Araki and Shueisha. Stand images come from the JoJo Wiki. This is a non-commercial learning project.
