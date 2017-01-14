# connect-5-api
Connect 5 back-end API using Socket.IO

# RESTful API

[TODO]

# Socket.io API

Certain eventing requires a duplex communication, so the documentation is organized by the **intent** of the events.

Within each event, there are data fields that are required / optional. Any field is required unless specified otherwise by a `?` symbol.

When a client initiates an emission, the server will always acknowledge the receival of that signal with an event name identical to the client emission with `.response` appended to the end of it.

When a server initiates an emission, the client **must** acknowledge the completion of any client-side changes unless otherwise specified. This is done by emitting an event identical to the server emission with `.response` appended to the end of it.

## General

**Error:**

```plaintext
SERVER: 'err'
  data:
    code: INT
    err : STRING
```

## Authenticating

[TBD]

## Queue

**Joining a queue:**

```plaintext
CLIENT: 'joinQueue'
  data:
    (none)

SERVER: 'joinQueue.response'
  data:
    success: BOOLEAN
    err    ? STRING
```

**When a match is found:**

```plaintext
SERVER: 'matchFound'
  data:
    (none)

CLIENT: 'matchFound.response'
  data:
    (none)
```

## In-Game:

**When a server is ready to begin a match:**

```plaintext
SERVER: 'gameReady'
  data:
    playerId: INT
    board   : ARRAY

CLIENT: 'gameReady.response'
  data:
    (none)
```

**When a turn is starting / an opponent has made a move:**

```plaintext
SERVER: 'turnStart'
  data:
    board     : ARRAY<ARRAY>
    lastPlayed: STRING
    turn      : playerId

CLIENT: (none expected)
```

**When a player is emitting a move:**

```plaintext
CLIENT: 'turnEnd'
  data:
    tileId: STRING

SERVER: (none expected)
```

**When a game has ended:**

```plaintext
SERVER: 'gameEnded'
  data:
    board     : ARRAY<ARRAY>
    lastPlayed: STRING
```

**When an opponent has disconnected:**

```plaintext
SERVER: 'opponentDisonnected'
  data:
    (none)
```
