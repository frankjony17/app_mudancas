# Generated by Django 2.0.1 on 2018-12-23 20:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cpf', models.CharField(max_length=15, unique=True)),
                ('nome', models.CharField(max_length=256)),
                ('fone', models.CharField(blank=True, max_length=128, null=True)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Endereco',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origem', models.CharField(blank=True, max_length=200, null=True)),
                ('destino', models.CharField(blank=True, max_length=200, null=True)),
                ('data', models.DateField()),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='transportadora.Cliente')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plaso_entrega', models.DateField(blank=True, null=True)),
                ('apanha', models.DateField(blank=True, null=True)),
                ('entrega', models.DateField(blank=True, null=True)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='MaterialTipo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=128, unique=True)),
            ],
            options={
                'default_permissions': (),
                'db_table': 'material_tipo',
            },
        ),
        migrations.CreateModel(
            name='Mudanca',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no_orden', models.IntegerField(blank=True, null=True)),
                ('metragem', models.FloatField(blank=True, null=True)),
                ('valor_seguro', models.FloatField(blank=True, null=True)),
                ('valor_servicio', models.FloatField(blank=True, null=True)),
                ('observacao', models.CharField(blank=True, max_length=32, null=True)),
                ('endereco', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='transportadora.Endereco')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='MudancaMaterial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('material_tipo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transportadora.MaterialTipo')),
                ('mudanca', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transportadora.Mudanca')),
            ],
            options={
                'default_permissions': (),
                'db_table': 'mudanca_material',
            },
        ),
        migrations.CreateModel(
            name='MudancaServicio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mudanca', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transportadora.Mudanca')),
            ],
            options={
                'default_permissions': (),
                'db_table': 'mudanca_servicio',
            },
        ),
        migrations.CreateModel(
            name='ObservacaoMudanca',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.TextField(default='')),
                ('mudanca', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='transportadora.Mudanca')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='ServicioTipo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=128, unique=True)),
            ],
            options={
                'default_permissions': (),
                'db_table': 'servicio_tipo',
            },
        ),
        migrations.CreateModel(
            name='Vistoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField(blank=True, null=True)),
                ('hora', models.TimeField(blank=True, null=True)),
                ('vistoriador', models.CharField(blank=True, max_length=256, null=True)),
                ('fechada', models.BooleanField()),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.AddField(
            model_name='mudancaservicio',
            name='servicio_tipo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transportadora.ServicioTipo'),
        ),
        migrations.AddField(
            model_name='mudanca',
            name='vistoria',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='transportadora.Vistoria'),
        ),
        migrations.AddField(
            model_name='estado',
            name='mudanca',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='transportadora.Mudanca'),
        ),
        migrations.AlterUniqueTogether(
            name='mudancaservicio',
            unique_together={('mudanca', 'servicio_tipo')},
        ),
        migrations.AlterUniqueTogether(
            name='mudancamaterial',
            unique_together={('mudanca', 'material_tipo')},
        ),
    ]