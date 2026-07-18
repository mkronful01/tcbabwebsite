export type NavItem = {
  path: string;
  label: string;
};

export type TopicItem = {
  id: string;
  title: string;
  description: string;
};

export class SiteContent {
  public static readonly brandName = "Business & Beyond";

  public static readonly legalName =
    "Business & Beyond for Consultancy and Studies LLC";

  public static readonly tagline =
    "Strategic clarity. Operational strength. Growth that lasts.";

  public static readonly contactEmail = "contact@tcbab.com";

  public static readonly websiteUrl = "https://www.tcbab.com";

  public static readonly websiteDisplay = "www.tcbab.com";

  public static readonly logoMarkSrc = "/assets/brand/business-beyond-mark.png";

  public static readonly logoOfficialSrc =
    "/assets/brand/business-beyond-official.png";

  public static readonly logoVideoSrc =
    "/assets/video/business-beyond-logo.mp4";

  public static readonly navItems: NavItem[] = [
    { path: "/", label: "Business & Beyond" },
    { path: "/about", label: "About" },
    { path: "/consulting-services", label: "Consulting Services" },
    { path: "/business-transformation", label: "Business Transformation" },
    { path: "/contact", label: "Contact" },
  ];

  public static readonly hero = {
    support:
      "Strategic consulting and business transformation for organizations across the UAE and Middle East.",
    primaryCta: { label: "About us", path: "/about" },
    secondaryCta: { label: "Contact", path: "/contact" },
  };

  public static readonly about = {
    label: "About",
    title: "Who we are.",
    lead:
      "Business & Beyond is a UAE-based consultancy focused on strategy, performance, and practical transformation.",
    paragraphs: [
      "We help organizations clarify direction, strengthen operations, and deliver change with accountability.",
      "Our work sits at the intersection of advisory and execution — supporting leadership teams with clear recommendations and hands-on delivery support.",
      "As part of Specitas Group, we combine business advisory depth with access to coordinated multidisciplinary expertise when projects need it.",
    ],
  };

  public static readonly consulting = {
    label: "Consulting Services",
    title: "Advisory that moves decisions forward.",
    lead:
      "Focused consulting support for leadership teams that need clarity, structure, and measurable progress.",
    items: [
      {
        id: "strategy",
        title: "Strategic consulting",
        description:
          "Direction-setting, priority frameworks, and leadership alignment around outcomes that matter.",
      },
      {
        id: "development",
        title: "Business development",
        description:
          "Market positioning, partnership pathways, and growth plans grounded in practical execution.",
      },
      {
        id: "operations",
        title: "Operational advisory",
        description:
          "Process improvement, organizational design, and performance systems that scale cleanly.",
      },
      {
        id: "corporate",
        title: "Corporate support",
        description:
          "Hands-on support for corporate initiatives, governance needs, and leadership delivery.",
      },
    ] as TopicItem[],
  };

  public static readonly transformation = {
    label: "Business Transformation",
    title: "Change that sticks.",
    lead:
      "We help organizations redesign how they work — so strategy becomes operating reality.",
    items: [
      {
        id: "assessment",
        title: "Transformation assessment",
        description:
          "A clear read on current-state gaps, readiness, and the highest-value change opportunities.",
      },
      {
        id: "operating-model",
        title: "Operating model redesign",
        description:
          "Structure, roles, and ways of working that support growth without adding unnecessary complexity.",
      },
      {
        id: "performance",
        title: "Performance improvement",
        description:
          "Targeted interventions that lift delivery quality, speed, and accountability across teams.",
      },
      {
        id: "change",
        title: "Change enablement",
        description:
          "Practical adoption support so new processes, systems, and behaviors take hold.",
      },
    ] as TopicItem[],
  };

  public static readonly contact = {
    label: "Contact",
    title: "Start a conversation.",
    support: "UAE · Middle East",
  };
}
