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

const offersCollection = defineCollection({
  loader: jsonIn('offers'),
  schema: z.object({
    // "Par où entrer" strip: one situation per package, in the same order
    packages: z.array(z.object({
      id: z.string(),
      situation: z.string(),
      title: z.string(),
      pitch: z.string(),
      form: z.string(),
      deliverable: z.string(),
      measured: z.string(),
      sovereign: z.string(),
    })).min(1).max(4),
    // What the page refuses to promise
    refusals: z.array(z.object({
      claim: z.string(),
      why: z.string(),
    })),
    // Facts a visitor can check, each with an optional link
    proofs: z.array(z.object({
      text: z.string(),
      href: z.string().optional(),
      label: z.string().optional(),
    })),
  }),
});

export const collections = {
  offers: offersCollection,
  careers: careersCollection,
  legal: legalCollection,
  services: servicesCollection,
  people: peopleCollection,
  tech: techCollection,
};
