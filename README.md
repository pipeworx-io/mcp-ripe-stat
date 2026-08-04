# @pipeworx/ripe-stat

RIPE Stat MCP — IP/ASN/BGP intelligence from RIPE NCC's data sources. RIPE region focused but covers global routing data. No auth.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `whois(resource)` — whois data for IP/prefix/ASN
- `network_info(resource)` — RIR registration, holder, prefix size
- `as_overview(asn)` — ASN summary
- `asn_neighbours(asn)` — BGP neighbours of an AS
- `bgp_state(resource)` — current BGP routing state
- `abuse_contact(resource)` — abuse contact for an IP/ASN
- `geoloc(resource)` — country location of an IP/prefix
- `prefix_overview(prefix)` — full intel on a prefix

## Data source

`https://stat.ripe.net/data/<endpoint>/data.json?resource=<r>` — public, no auth.

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "ripe-stat": {
      "url": "https://gateway.pipeworx.io/ripe-stat/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Ripe Stat data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
