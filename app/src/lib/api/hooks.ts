import { useMutation } from '@tanstack/react-query';
import { trpc } from './trpcClient';
import type { CaravanDraw, CaravanRun } from './types';

/**
 * Thin wrappers around the tRPC client — every hook here mirrors the shape the mock layer
 * used to have (see CONTEXT.md), so components didn't need to change when this stopped being
 * a mock. Where a component's mutate() input doesn't line up 1:1 with a tRPC procedure's input
 * (caravan run editing needs a nick→playerId lookup; squads/profile need cache patching), the
 * translation lives here, not in the component.
 */

export function useProfile() {
  return trpc.profile.get.useQuery();
}

export function useUpdateNick() {
  const utils = trpc.useUtils();
  return trpc.profile.updateNick.useMutation({
    // The nick can appear as an `isSelf` row in any roster/leaderboard query — refresh them all.
    onSuccess: () => utils.invalidate(),
  });
}

export function useAddSquad() {
  const utils = trpc.useUtils();
  return trpc.squads.add.useMutation({
    onSuccess: (squads) => utils.profile.get.setData(undefined, (old) => old && { ...old, squads }),
  });
}

export function useUpdateSquad() {
  const utils = trpc.useUtils();
  return trpc.squads.update.useMutation({
    onSuccess: (squads) => utils.profile.get.setData(undefined, (old) => old && { ...old, squads }),
  });
}

export function useDeleteSquad() {
  const utils = trpc.useUtils();
  return trpc.squads.delete.useMutation({
    onSuccess: (squads) => utils.profile.get.setData(undefined, (old) => old && { ...old, squads }),
  });
}

export function useAlliancePlayers() {
  return trpc.players.list.useQuery();
}

export function useAddPlayer() {
  const utils = trpc.useUtils();
  return trpc.players.add.useMutation({
    onSuccess: (players) => utils.players.list.setData(undefined, players),
  });
}

export function useUpdatePlayer() {
  const utils = trpc.useUtils();
  return trpc.players.update.useMutation({
    onSuccess: (players) => {
      utils.players.list.setData(undefined, players);
      // Editing the self row's level/group must show up on the Profile page too.
      utils.profile.get.invalidate();
    },
  });
}

export function useDeletePlayer() {
  const utils = trpc.useUtils();
  return trpc.players.remove.useMutation({
    onSuccess: (players) => {
      utils.players.list.setData(undefined, players);
      utils.profile.get.invalidate();
    },
  });
}

export function useCaravan() {
  return trpc.caravan.list.useQuery();
}

export function useRollCaravan() {
  return trpc.caravan.roll.useMutation();
}

export function useAddCaravanRun() {
  const utils = trpc.useUtils();
  return useMutation({
    mutationFn: (draw: CaravanDraw) => {
      if (!draw.coachmanPlayerId || !draw.escortPlayerId) {
        throw new Error('Не удалось определить игроков розыгрыша.');
      }
      return utils.client.caravan.confirm.mutate({
        coachmanPlayerId: draw.coachmanPlayerId,
        escortPlayerId: draw.escortPlayerId,
        escortRole: draw.escortRole,
      });
    },
    onSuccess: (runs) => utils.caravan.list.setData(undefined, runs),
  });
}

export function useUpdateCaravanRun() {
  const utils = trpc.useUtils();
  return useMutation({
    mutationFn: async (run: CaravanRun) => {
      const players = utils.players.list.getData() ?? (await utils.players.list.fetch());
      const coachmanPlayerId = players.find((p) => p.nick === run.coachman.nick)?.id;
      const escortPlayerId = players.find((p) => p.nick === run.escort.nick)?.id;
      if (!coachmanPlayerId || !escortPlayerId) throw new Error('Игрок не найден в ростере альянса.');
      return utils.client.caravan.update.mutate({
        id: run.id,
        coachmanPlayerId,
        escortPlayerId,
        escortRole: run.escortRole,
        lastAssignedDate: run.lastAssignedDate,
      });
    },
    onSuccess: (runs) => utils.caravan.list.setData(undefined, runs),
  });
}

export function useElixirRace() {
  return trpc.elixirRace.list.useQuery();
}

export function useFormation() {
  return trpc.formation.list.useQuery();
}

export function useContribution() {
  return trpc.contribution.list.useQuery();
}

export function useWeeklyRating() {
  return trpc.contribution.history.useQuery();
}

export function useCreatePowerSnapshot() {
  const utils = trpc.useUtils();
  return trpc.powerSnapshot.create.useMutation({
    onSuccess: () => utils.profile.get.invalidate(),
  });
}

export function useSettings() {
  return trpc.settings.get.useQuery();
}

export function useUpdateSetting() {
  const utils = trpc.useUtils();
  return trpc.settings.update.useMutation({
    onSuccess: (settings) => utils.settings.get.setData(undefined, settings),
  });
}
