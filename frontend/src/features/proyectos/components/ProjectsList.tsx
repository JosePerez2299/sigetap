import { motion, AnimatePresence } from "framer-motion";
import type { ProyectoType } from "../../../types/generalTypes";
import { FileX, FileX2Icon } from "lucide-react";
import ProjectCard from "./ProjectCard";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.3 },
};

const ProjectsList = ({
  projects,
  count,
  currentPage,
  pageSize,
  isLoading,
  error,
}: {
  projects: ProyectoType[];
  count: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: Error | null;
}) => {
  const currentStart = count > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const currentEnd = count > 0 ? currentStart + projects.length - 1 : 0;

  return (
    <div className="relative min-h-[400px]">
      {/* Loading Skeleton */}
      {isLoading && (
        <div>
          <div className="space-y-3">
            <div className="h-12 skeleton rounded-lg"></div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-16 skeleton rounded-lg"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            {...fadeInUp}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FileX className="h-5 w-5 text-error" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-error">
                    Error al cargar proyectos
                  </h3>
                  <p className="text-sm text-error mt-1">{error.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {!isLoading && projects && projects.length === 0 && (
          <motion.div
            {...fadeInUp}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-base-content/70">
                <FileX2Icon className="size-16 text-base-content/50" />
              </div>
              <h3 className="text-lg font-medium text-base-content/70 mb-2">
                No hay proyectos
              </h3>
              <p className="text-base-content/70">
                No se encontraron proyectos que coincidan con los filtros
                aplicados.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence>
        {projects && projects.length > 0 && (
          <motion.ul
            className="list bg-base-100 space-y-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <li>
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm text-base-content/70">
                  Resultados del {currentStart} al {currentEnd}
                </span>
                <span className="badge badge-sm badge-info badge-outline">
                  Total: {count}
                </span>
              </motion.div>
            </li>

            {projects.map((proyecto) => (
              <motion.li key={proyecto.id} variants={itemVariants}>
                <ProjectCard proyecto={proyecto} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsList;
