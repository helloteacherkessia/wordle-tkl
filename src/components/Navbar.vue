<script setup lang="ts">
import { Badge, Dialog, Menubar, Message } from 'primevue';
import { onMounted, ref } from 'vue';
import { DataService } from '../services/data.service';
import Chart from 'primevue/chart';
import Popover from 'primevue/popover';
import { GameService } from '../services/game.service';

const visible = ref(false);
const op = ref();
const hint = ref("");
const items = ref([
    {
        label: 'Streak',
        icon: 'pi pi-flag-fill',
        badge: DataService.getData().streak,
        action: () => {
            visible.value = true;
        }
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope',
        action: () => {
            window.open("https://wa.me/558597362806", '_blank'); 
        }
    }
]);

const showHint = (event: any) => {
    hint.value = GameService.updateHintUsage();
    op.value.toggle(event)
}

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: Object.keys(DataService.getData().ammount).map( key => key.toUpperCase()),
        datasets: [
            {
                label: 'Amount',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                barPercentage: 0.5,
                data: Object.values(DataService.getData().ammount)
            },
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        indexAxis: 'y',
        maintainAspectRatio: true,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>

<template>
<Dialog v-model:visible="visible" modal :header="`Current streak: ${DataService.getData().streak} day(s)`" :style="{ width: '25rem' }">
    <span><i class="pi pi-lightbulb"></i> Hint usage: {{  DataService.getData().hintsUsed }}</span>
    <Chart type="bar" :data="chartData" :options="chartOptions"  />
</Dialog>
<Menubar :model="items">
    <template #start>
        <img src="https://meuproximosite.nyc3.cdn.digitaloceanspaces.com/prd/minisite/teacher-kessia-lima/logo/ong2.1722522390409.logo.png" style="filter: invert(1); width: 100px;">
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action" @click="item?.action?.()">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" severity="danger" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
    </template>
    <template #end>
        <div class="flex items-center gap-2">
            <a v-ripple class="flex items-center justify-center" @click="showHint">
                <i class="pi pi-lightbulb"></i>
                <span>Show Hint</span>
            </a>
            <Popover ref="op">
                <Message severity="info" icon="pi pi-lightbulb">{{ hint.charAt(0).toUpperCase() + hint.slice(1) }}</Message>
            </Popover>
        </div>
    </template>
</Menubar>
</template>