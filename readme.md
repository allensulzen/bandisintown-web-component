# Biit Artist Web Component

The **Biit Artist Web Component** is a Stencil-built web component that displays artist information and upcoming events. It does not fetch data itself but requires you to provide the artist and event data fetched from the Bandsintown API.

## Installation

You can install the package via npm:

```sh
npm i bandisintown-web-component
```

Or include the component’s script via the CDN in your HTML file:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/bandisintown-web-component@latest/dist/esm/bandisintown-web-component.js"></script>
```

## Usage

You can use `<biit-artist>` in any modern framework or directly in HTML. Below are examples for different environments.

### Fetching Data

You will need to fetch artist and event data from the Bandsintown API before passing it to the component:

- **Artist Info:**
  ```
  https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
  ```
- **Events:**
  ```
  https://rest.bandsintown.com/artists/{{artist_name}}/events/?app_id=yOUrSuP3r3ven7aPp-id
  ```

### Basic HTML Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Biit Artist Demo</title>
    <script type="module" src="https://cdn.jsdelivr.net/npm/bandisintown-web-component@latest/dist/esm/bandisintown-web-component.js"></script>
  </head>
  <body>
    <biit-artist background-color="black" text-color="red"></biit-artist>
    <script>
      const artistName = 'Coldplay';
      const appId = 'yOUrSuP3r3ven7aPp-id';
      
      Promise.all([
        fetch(`https://rest.bandsintown.com/artists/${artistName}/?app_id=${appId}`).then(res => res.json()),
        fetch(`https://rest.bandsintown.com/artists/${artistName}/events/?app_id=${appId}`).then(res => res.json())
      ]).then(([artist, events]) => {
        const biitArtist = document.querySelector('biit-artist');
        biitArtist.artist = artist;
        biitArtist.events = events;
      });
    </script>
  </body>
</html>
```

### React Usage

```jsx
import React, { useEffect, useRef } from 'react';
import 'bandisintown-web-component';

function BiitArtistComponent() {
  const artistRef = useRef(null);
  const artistName = 'Coldplay';
  const appId = 'yOUrSuP3r3ven7aPp-id';

  useEffect(() => {
    Promise.all([
      fetch(`https://rest.bandsintown.com/artists/${artistName}/?app_id=${appId}`).then(res => res.json()),
      fetch(`https://rest.bandsintown.com/artists/${artistName}/events/?app_id=${appId}`).then(res => res.json())
    ]).then(([artist, events]) => {
      if (artistRef.current) {
        artistRef.current.artist = artist;
        artistRef.current.events = events;
      }
    });
  }, []);

  return <biit-artist ref={artistRef} background-color="black" text-color="red"></biit-artist>;
}

export default BiitArtistComponent;
```

### Vue Usage

```vue
<template>
  <biit-artist ref="artist" background-color="black" text-color="red"></biit-artist>
</template>

<script>
import 'bandisintown-web-component';

export default {
  mounted() {
    const artistName = 'Coldplay';
    const appId = 'yOUrSuP3r3ven7aPp-id';

    Promise.all([
      fetch(`https://rest.bandsintown.com/artists/${artistName}/?app_id=${appId}`).then(res => res.json()),
      fetch(`https://rest.bandsintown.com/artists/${artistName}/events/?app_id=${appId}`).then(res => res.json())
    ]).then(([artist, events]) => {
      this.$refs.artist.artist = artist;
      this.$refs.artist.events = events;
    });
  },
};
</script>
```

### Svelte Usage

```svelte
<script>
  import 'bandisintown-web-component';
  let artist;
  const artistName = 'Coldplay';
  const appId = 'yOUrSuP3r3ven7aPp-id';

  Promise.all([
    fetch(`https://rest.bandsintown.com/artists/${artistName}/?app_id=${appId}`).then(res => res.json()),
    fetch(`https://rest.bandsintown.com/artists/${artistName}/events/?app_id=${appId}`).then(res => res.json())
  ]).then(([artistData, eventsData]) => {
    artist.artist = artistData;
    artist.events = eventsData;
  });
</script>

<biit-artist bind:this={artist} background-color="black" text-color="red"></biit-artist>
```

## Properties

The `<biit-artist>` component supports the following properties:

| Property             | Type    | Description |
|----------------------|---------|-------------|
| `artist`            | object  | Artist information fetched from the Bandsintown API. |
| `events`            | array   | List of upcoming events. |
| `backgroundColor`   | string  | Background color of the component. |
| `textColor`         | string  | Primary text color. |
| `textHoverColor`    | string  | Text color on hover. |
| `fontFamily`        | string  | Font family for text. |
| `buttonBgColor`     | string  | Background color for buttons. |
| `buttonTextColor`   | string  | Text color for buttons. |
| `buttonBgHoverColor` | string | Background color for buttons on hover. |

## Repository

View the source code and contribute at: [GitHub Repository](https://github.com/allensulzen/bandisintown-web-component)

## License

This project is open-source under the [MIT License](LICENSE).