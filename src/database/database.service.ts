import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class DatabaseService implements OnModuleInit {
    public constructor(@InjectConnection() private connection: Connection) { }

    public async onModuleInit() {
        console.log('Database connection status:', this.getConnectionStatus());
    }

    private getConnectionStatus() {
        switch (this.connection.readyState) {
            case 0: return 'Disconnected';
            case 1: return 'Connected';
            case 2: return 'Connecting';
            case 3: return 'Disconnecting';
            default: return 'Unknown';
        }
    }
}
