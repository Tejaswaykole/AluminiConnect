export const queryKeys = {
  users: {
    all: ['users'] as const,
    current: () => [...queryKeys.users.all, 'current'] as const,
    students: () => [...queryKeys.users.all, 'students'] as const,
    alumni: () => [...queryKeys.users.all, 'alumni'] as const,
  },
  events: {
    all: ['events'] as const,
    list: () => [...queryKeys.events.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.events.all, 'detail', id] as const,
  },
  opportunities: {
    all: ['opportunities'] as const,
    list: () => [...queryKeys.opportunities.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.opportunities.all, 'detail', id] as const,
  },
  communities: {
    all: ['communities'] as const,
    list: () => [...queryKeys.communities.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.communities.all, 'detail', id] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    list: () => [...queryKeys.notifications.all, 'list'] as const,
  },
  placement: {
    all: ['placement'] as const,
    drives: () => [...queryKeys.placement.all, 'drives'] as const,
  }
};
