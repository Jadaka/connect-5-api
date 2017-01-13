# connect-5-api
Connect 5 back-end API using Socket.IO

# RESTful API

[TODO]

# Socket.io API

Certain eventing requires a duplex communication, so the documentation is organized by the **intent** of the events.

Within each event, there are data fields that are required / optional. Any field is required unless specified otherwise by a `?` symbol.

When a client initiates an emission, the server will always acknowledge the receival of that signal with an event name identical to the client emission with `.response` appended to the end of it.

When a server initiates an emission, the client **must** acknowledge the completion of any client-side changes that must render/complete before the server knows to move on. This is done by emitting an event identical to the server emission with `.response` appended to the end of it.

## General
---

### Error

```plaintext
SERVER: 'err'
  data:
    code: INT
    err : STRING
```

## Authenticating
---

[TBD]

## Queue
---

### Joining a queue:

```plaintext
CLIENT: 'joinQueue'
  data:
    (none)

SERVER: 'joinQueue.response'
  data:
    (none)
```

---

### When a match is found:

```plaintext
SERVER: 'matchFound'
  data:
    (none)

CLIENT: 'matchFound.response'
  data:
    (none)
```

## In-Game:

```plaintext
SERVER: 'gameReady'
  data:
    playerId: INT
    board   : ARRAY

CLIENT: 'gameReady.response'
  data:
    (none)
```

[TODO]
