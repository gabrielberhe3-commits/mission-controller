import { ProjectList } from "@/components/mission/mission-cards";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import {
  getDocsForProject,
  getEventsForProject,
  getMemoryForProject,
  getTasksForProject,
  seededProjects,
} from "@/data/mission-control";

export default function ProjectsPage() {
  const featured = seededProjects[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Projects"
        title="Projects become the container layer for connected work."
        description="This page demonstrates the future model: tasks, events, docs, and memories can all cluster around a project without introducing backend complexity yet."
      />

      <Panel
        title="Portfolio"
        description="Each project already carries progress, status, and milestone fields ready for seeded or persistent repositories."
        action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">New project</button>}
      >
        <ProjectList projects={seededProjects} />
      </Panel>

      <Panel
        title="Connected object graph"
        description={`Mission Controller currently links seeded objects around ${featured.name}.`}
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-[#8ea0b5]">Tasks linked</p>
            <p className="mt-2 text-3xl font-semibold text-white">{getTasksForProject(featured.id).length}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-[#8ea0b5]">Events linked</p>
            <p className="mt-2 text-3xl font-semibold text-white">{getEventsForProject(featured.id).length}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-[#8ea0b5]">Docs linked</p>
            <p className="mt-2 text-3xl font-semibold text-white">{getDocsForProject(featured.id).length}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-[#8ea0b5]">Memories linked</p>
            <p className="mt-2 text-3xl font-semibold text-white">{getMemoryForProject(featured.id).length}</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
