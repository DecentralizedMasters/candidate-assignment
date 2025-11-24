const LEVELS = { info: 0, warn: 1, error: 2 } as const;
type L = keyof typeof LEVELS;

class Logger {
    level = LEVELS[process.env.LOG_LEVEL as L] ?? 0;

    private out(l: L, msg: string) {
        if (LEVELS[l] > this.level) return;
        console[l === "error" ? "error" : l](
            `[${new Date().toISOString()}] [${l.toUpperCase()}]`,
            msg
        );
    }

    info(msg: string) { this.out("info", msg); }
    warn(msg: string) { this.out("warn", msg); }
    error(msg: string) { this.out("error", msg); }
}

export const logger = new Logger();
