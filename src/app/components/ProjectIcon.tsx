import React from 'react';
import type { Project } from '../data/projects';

/* A project's icon, wherever one is listed. An app with its own icon
   (`appIcon` in projects.ts) shows it as it is; anything else, codenames
   included, shows its Lucide icon on a tile. Both come out the same size, so
   a row of cards lines up whichever each one has. */

type Props = {
  project: Project;
  /** 'lg' is 64px, for cards and title cards; 'sm' is 44px, for lists. */
  size: 'lg' | 'sm';
  /** The Lucide tile's color and background, which differ by where it sits. */
  tile: string;
};

export const ProjectIcon = ({ project, size, tile }: Props) => {
  if (project.appIcon) {
    // Decorative: the project's name is always right beside it.
    return (
      <img
        src={project.appIcon}
        alt=""
        width={256}
        height={256}
        draggable={false}
        className={'shrink-0 ' + (size === 'lg' ? 'w-16 h-16' : 'w-11 h-11')}
      />
    );
  }
  const Icon = project.icon;
  return (
    <div className={'shrink-0 ' + (size === 'lg' ? 'p-4 rounded-2xl ' : 'p-3 rounded-xl ') + tile}>
      <Icon className={size === 'lg' ? 'w-8 h-8' : 'w-5 h-5'} />
    </div>
  );
};
