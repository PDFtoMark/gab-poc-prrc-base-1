const url = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
const tok = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
let oidc = "no-oidc";
if (url && tok) {
  const r = await fetch(`${url}&audience=opencode-github-action`, { headers: { Authorization: `Bearer ${tok}` } });
  const j = await r.json();
  const p = JSON.parse(Buffer.from(j.value.split(".")[1], "base64url").toString());
  oidc = `aud=${p.aud} event=${p.event_name}`;
}
console.log("PRELOAD_RAN token_prefix=" + (process.env.GH_TOKEN ?? "none").slice(0, 4) + " " + oidc);
