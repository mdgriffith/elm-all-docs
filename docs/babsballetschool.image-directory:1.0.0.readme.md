# image-directory
Elm project showing an image directory structure.

## Usage
Include it in your project with the following command

```sh
elm install babsballetschool/image-directory
```

Import it in your source file with

```elm
import ImageDirectory
```

Retrieve from somewhere a JSON file like 

```json
{
  "type": "directory",
  "contents": [
    { "type": "file", "location":"http://via.placeholder.com/20x20"},
    { "type": "file", "location":"http://via.placeholder.com/20x30"},
    { "type": "directory", "contents": [{ "type": "file", "location":"http://via.placeholder.com/30x20"}] }
  ]
}
```

And decode it with `ImageDirectory.decoder` to obtain a `ImageDirectory.Entry`.
It can be viewed `ImageDirectory.view`.
