import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.IntStream;


public class ThreadPoolExample {

    private static final int NUM_OF_TASKS = 40;
    private static final int POOL_SIZE = 20;

    public static void main(String[] args) {
        var tasks = IntStream.rangeClosed(1, NUM_OF_TASKS).boxed().toList();

        var availableProcessors = Runtime.getRuntime().availableProcessors();
        System.out.printf("availableProcessors : %d%n", availableProcessors);

        parallelStreamExample(tasks);
    }

    private static void executorServiceExample(List<Integer> tasks) {
        System.out.println("executorServiceExample() start");

        try (var executorService = Executors.newFixedThreadPool(POOL_SIZE)) {
            tasks.forEach(taskId -> executorService.submit(() -> runTask(taskId, 1000)));
        }

        System.out.println("executorServiceExample() end");
    }

    private static void parallelStreamExample(List<Integer> tasks) {
        System.out.println("parallelStreamExample() start");

        try (var pool = new ForkJoinPool(POOL_SIZE)) {
            pool.submit(() -> {
                tasks.parallelStream().forEach(taskId -> runTask(taskId, 1000));
            }).get();
        } catch (Exception ignored) {
        }

        System.out.println("parallelStreamExample() end");
    }

    private static void runTask(int taskId, long millis) {
        System.out.printf("Task %d start%n", taskId);

        try {
            Thread.sleep(millis);
        } catch (Exception ignored) {}

        System.out.printf("Task %d end%n", taskId);
    }
}
