export const featureFlags = {
  gooEnabled: process.env.NEXT_PUBLIC_GOO_ENABLED !== "false",
  experimentalGooNotGptHook: process.env.ENABLE_GOO_TO_NOTGPT_HOOK === "true",
  anonymousLiveSearchAllowed: process.env.LIVE_SEARCH_ALLOWED === "true",
  demoAdminAccess: process.env.DEMO_ADMIN_ACCESS === "true"
} as const;

export function assertGooIsNotInNotGptPipeline() {
  if (featureFlags.experimentalGooNotGptHook) {
    return {
      enabled: true,
      warning:
        "Experimental GOO-to-NOT-GPT hook is enabled. It must remain outside ordinary answer generation."
    };
  }

  return {
    enabled: false,
    warning:
      "GOO is not part of the NOT GPT answer pipeline. It is an independent opportunity-discovery framework deployed within the same platform."
  };
}
