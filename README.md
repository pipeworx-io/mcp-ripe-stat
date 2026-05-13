# mcp-ripe-stat

RIPE Stat MCP — IP/ASN/BGP data

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `whois` | Whois data for an IP, prefix, or ASN. Aggregates across RIRs. |
| `network_info` | Network info (allocated prefix, ASN) for an IP. |
| `as_overview` | ASN summary — holder, country, type, block range. |
| `asn_neighbours` | BGP neighbours of an AS — observed via RIS route collectors. |
| `bgp_state` | Current BGP routing state for a resource — origin ASNs and path lengths. |
| `abuse_contact` | Abuse contact email(s) for a resource (from inetnum / aut-num records). |
| `geoloc` | Country geolocation of an IP/prefix from RIR registration. |
| `prefix_overview` | Comprehensive prefix overview — announcements, origins, allocation. |

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

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
