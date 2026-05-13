interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * RIPE Stat MCP — IP/ASN/BGP data
 *
 * Public, no auth. Generous rate limits (1000 req / 10 min / source IP).
 * Base URL pattern: https://stat.ripe.net/data/<endpoint>/data.json?resource=<r>
 *
 * Docs: https://stat.ripe.net/docs/02.data-api/
 */


const BASE = 'https://stat.ripe.net/data';

const tools: McpToolExport['tools'] = [
  {
    name: 'whois',
    description: 'Whois data for an IP, prefix, or ASN. Aggregates across RIRs.',
    inputSchema: {
      type: 'object',
      properties: {
        resource: { type: 'string', description: 'IP address, prefix, or AS number (e.g. "8.8.8.8", "8.8.8.0/24", "AS15169")' },
      },
      required: ['resource'],
    },
  },
  {
    name: 'network_info',
    description: 'Network info (allocated prefix, ASN) for an IP.',
    inputSchema: {
      type: 'object',
      properties: { resource: { type: 'string', description: 'IPv4/IPv6 address' } },
      required: ['resource'],
    },
  },
  {
    name: 'as_overview',
    description: 'ASN summary — holder, country, type, block range.',
    inputSchema: {
      type: 'object',
      properties: { asn: { type: 'string', description: 'AS number (e.g. "AS15169" or "15169")' } },
      required: ['asn'],
    },
  },
  {
    name: 'asn_neighbours',
    description: 'BGP neighbours of an AS — observed via RIS route collectors.',
    inputSchema: {
      type: 'object',
      properties: { asn: { type: 'string', description: 'AS number' } },
      required: ['asn'],
    },
  },
  {
    name: 'bgp_state',
    description: 'Current BGP routing state for a resource — origin ASNs and path lengths.',
    inputSchema: {
      type: 'object',
      properties: { resource: { type: 'string', description: 'IP, prefix, or ASN' } },
      required: ['resource'],
    },
  },
  {
    name: 'abuse_contact',
    description: 'Abuse contact email(s) for a resource (from inetnum / aut-num records).',
    inputSchema: {
      type: 'object',
      properties: { resource: { type: 'string', description: 'IP, prefix, or ASN' } },
      required: ['resource'],
    },
  },
  {
    name: 'geoloc',
    description: 'Country geolocation of an IP/prefix from RIR registration.',
    inputSchema: {
      type: 'object',
      properties: { resource: { type: 'string', description: 'IP or prefix' } },
      required: ['resource'],
    },
  },
  {
    name: 'prefix_overview',
    description: 'Comprehensive prefix overview — announcements, origins, allocation.',
    inputSchema: {
      type: 'object',
      properties: { resource: { type: 'string', description: 'Prefix (e.g. "8.8.8.0/24")' } },
      required: ['resource'],
    },
  },
];

const ENDPOINT_MAP: Record<string, string> = {
  whois: 'whois',
  network_info: 'network-info',
  as_overview: 'as-overview',
  asn_neighbours: 'asn-neighbours',
  bgp_state: 'bgp-state',
  abuse_contact: 'abuse-contact-finder',
  geoloc: 'geoloc',
  prefix_overview: 'prefix-overview',
};

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const ep = ENDPOINT_MAP[name];
  if (!ep) throw new Error(`Unknown tool: ${name}`);
  const resource = (args.resource as string) ?? (args.asn as string);
  if (!resource || !String(resource).trim()) {
    throw new Error(`Required argument "${name.includes('as') && !name.includes('whois') ? 'asn' : 'resource'}" is missing.`);
  }
  const params = new URLSearchParams({ resource: String(resource) });
  const url = `${BASE}/${ep}/data.json?${params}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`RIPE Stat error: ${res.status} ${t.slice(0, 200)}`);
  }
  return res.json();
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
