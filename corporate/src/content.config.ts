import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each collection is a folder of JSON files under src/content/. The entry id
// is the file name, so getEntry('legal', 'privacy-policy') keeps working.
const jsonIn = (folder: string) => glob({ pattern: '*.json', base: `./src/content/${folder}` });

const peopleCollection = defineCollection({
  loader: jsonIn('people'),
  schema: z.object({
    photos: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      icon: z.string(),
    })),
    contractTypes: z.array(z.object({
      type: z.string(),
      icon: z.string(),
    })),
    leadership: z.array(z.object({
      name: z.string(),
      role: z.string(),
      linkedin: z.string(),
      github: z.string().optional(),
      photo: z.string().optional(),
    })),
    testimonials: z.array(z.object({
      name: z.string(),
      role: z.string(),
      quote: z.string(),
    })),
    // Video interviews: `slug` names the files (<slug>.webm/.mp4 in the media
    // bucket, <slug>.avif and <slug>.fr.vtt under public/videos/team/)
    interviews: z.array(z.object({
      slug: z.string(),
      name: z.string(),
      role: z.string(),
      duration: z.string(),
      // Object name in the media bucket when it differs from the slug: renditions
      // are published immutable, so a replaced video gets a new name
      media: z.string().optional(),
    })).default([]),
  }),
});

const legalCollection = defineCollection({
  loader: jsonIn('legal'),
  schema: z.object({
    title: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    lastUpdated: z.string().optional(),
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      link: z.object({
        text: z.string(),
        url: z.string(),
      }).optional(),
    })),
  }),
});

const sdlcPhase = z.enum([
  'cadrage',
  'conception',
  'implementation',
  'tests',
  'deploiement',
  'mco',
]);

const servicesCollection = defineCollection({
  loader: jsonIn('services'),
  schema: z.object({
    sectionTitle: z.string(),
    sectionTitleHighlight: z.string(),
    sectionDescription: z.string(),
    // Toggle "Traditionnel <-> AI Driven"
    traditionalLabel: z.string().default('Ingénierie artisanale'),
    aiLabel: z.string().default('Augmentée'),
    aiHint: z.string().optional(),
    aiTrackPrefix: z.string().default('// harness'),
    items: z.array(z.object({
      id: z.string(),
      title: z.string(),
      icon: z.string(),
      description: z.string(),
      // Preserved from the previous design (kept for future reuse)
      technologies: z.array(z.string()),
      tags: z.array(z.string()),
      // SDLC positioning
      sdlcLabel: z.string(),
      sdlcPhases: z.array(sdlcPhase).default([]),
      transverse: z.boolean().default(false),
      // AI Driven "// harness" parallel track
      aiTrackTitle: z.string().optional(),
      aiMethodologies: z.array(z.string()).default([]),
    })),
  }),
});

const techCollection = defineCollection({
  loader: jsonIn('tech'),
  schema: z.object({
    intro: z.object({
      title: z.string(),
      titleHighlight: z.string(),
      description: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      icon: z.string(),
    })),
    roles: z.array(z.object({
      role: z.string(),
      icon: z.string(),
    })),
    stacks: z.array(z.object({
      name: z.string(),
      icon: z.string(),
      technologies: z.array(z.string()),
    })),
    methodologies: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })),
  }),
});

const careersCollection = defineCollection({
  loader: jsonIn('careers'),
  schema: z.object({
    practices: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    roles: z.array(z.object({
      id: z.string(),
      title: z.string(),
      pitch: z.string(),
      // Seniority expected, printed under the pitch when set
      profile: z.string().optional(),
      daily: z.array(z.string()),
      // Phases of the shared SDLC pipeline this role mostly works on
      sdlcPhases: z.array(sdlcPhase).min(1),
      augmentedBy: z.array(z.string()),
    })),
    growth: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
  }),
});

// The five stations of the method pipeline that runs through the offers page
const station = z.enum(['spec', 'code', 'test', 'deploiement', 'mesure']);

const offersCollection = defineCollection({
  loader: jsonIn('offers'),
  schema: z.object({
    hero: z.object({
      title: z.string(),
      highlight: z.string(),
      subtitle: z.string(),
      primaryCta: z.string(),
      secondaryCta: z.string(),
    }),
    method: z.object({
      title: z.string(),
      caption: z.string(),
    }),
    packages: z.array(z.object({
      id: z.string(),
      situation: z.string(),
      title: z.string(),
      pitch: z.string(),
      // Stations of the pipeline this package covers
      stations: z.array(station).min(1),
      // Who comes: the roles from the careers page that staff this package
      roles: z.array(z.string()).min(1),
      form: z.string(),
      deliverable: z.string(),
      measured: z.string(),
      sovereign: z.string(),
      // Optional: the deliverable shown as a repository tree, one entry per path
      tree: z.array(z.object({ path: z.string(), note: z.string() })).optional(),
    })).min(1).max(4),
    refusalsTitle: z.string(),
    // What the page refuses to promise
    refusals: z.array(z.object({
      claim: z.string(),
      why: z.string(),
    })),
    // Facts a visitor can check, each with an optional link
    proofsTitle: z.string(),
    proofsIntro: z.string(),
    proofs: z.array(z.object({
      // Short figure or word set large above the text
      lead: z.string(),
      text: z.string(),
      href: z.string().optional(),
      label: z.string().optional(),
    })),
    cta: z.object({
      title: z.string(),
      text: z.string(),
      button: z.string(),
    }),
  }),
});

// Talks given by the collective and the open source projects we maintain.
// `date` is `YYYY-MM`, or `YYYY-MM-DD` when the day is known: it sorts as a
// string, and a dated talk after the build day is shown as upcoming.
// `thumbnail` is relative to the JSON file and goes through the image pipeline.
const contributionsCollection = defineCollection({
  loader: jsonIn('contributions'),
  schema: ({ image }) => z.object({
    talks: z.array(z.object({
      title: z.string(),
      event: z.string(),
      date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/),
      city: z.string().optional(),
      speakers: z.array(z.string()).min(1),
      summary: z.string().optional(),
      thumbnail: image().optional(),
      video: z.string().url().optional(),
      slides: z.string().url().optional(),
      // Event page or post, for talks with no recording
      page: z.string().url().optional(),
      // Earlier editions of the same talk, folded into one card
      alsoGivenAt: z.array(z.object({
        event: z.string(),
        date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/),
        video: z.string().url().optional(),
      })).default([]),
    })).default([]),
    projects: z.array(z.object({
      name: z.string(),
      description: z.string(),
      // Where the card leads: the live tool when there is one, else the repo
      url: z.string().url(),
      // Source code, when `url` is not already the repo
      repo: z.string().url().optional(),
      maintainers: z.array(z.string()).default([]),
      thumbnail: image().optional(),
      stack: z.array(z.string()).default([]),
    })).default([]),
  }),
});

// Trainings we give, on their own page. `thumbnailDark` is the variant shown in
// the dark theme, when the visual exists in both palettes.
const trainingsCollection = defineCollection({
  loader: jsonIn('trainings'),
  schema: ({ image }) => z.object({
    trainings: z.array(z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      // Announced but not scheduled yet: shown with a badge
      upcoming: z.boolean().default(false),
      highlights: z.array(z.string()).default([]),
      // Short labels: duration, place, mode
      formats: z.array(z.string()).default([]),
      thumbnail: image().optional(),
      thumbnailDark: image().optional(),
    })).default([]),
  }),
});

export const collections = {
  trainings: trainingsCollection,
  contributions: contributionsCollection,
  offers: offersCollection,
  careers: careersCollection,
  legal: legalCollection,
  services: servicesCollection,
  people: peopleCollection,
  tech: techCollection,
};
